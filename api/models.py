import uuid
from django.conf import settings
from django.db import models, transaction
from django.db.models.aggregates import Sum
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from .errors import Error, ExceedsLimit, InsufficientFunds, InvalidAmount

from django.utils import timezone


class Account(models.Model):
    class Meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'

    MAX_TOTAL_BALANCES = 1000000
    MAX_BALANCE = 10000
    MIN_BALANCE = 0

    MAX_DEPOSIT = 1000
    MIN_DEPOSIT = 1

    MAX_WITHDRAW = 1000
    MIN_WITHDRAW = 1

    id = models.AutoField(primary_key=True)
    uid = models.UUIDField(unique=True, editable=False,
                           default=uuid.uuid4, verbose_name='Public identifier')
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    balance = models.PositiveIntegerField(
        verbose_name='Current balance', default='0')

    @classmethod
    def create(cls, user, created_by, asof):
        """Create account.

        user (User):
            Owner of the account.
        created_by (User):
            User that created the account.
        asof (datetime.datetime):
            Time of creation.

        Returns (tuple):
            [0] Account
            [1] Action
        """
        with transaction.atomic():
            account = cls.objects.create(
                user=user,
                created=asof,
                modified=asof,
                balance=0,
            )

            action = Action.create(
                user=created_by,
                account=account,
                type=Action.ACTION_TYPE_CREATED,
                delta=0,
                asof=asof,
            )

        return account, action

    @classmethod
    def deposit(cls, uid, deposited_by, reference, reference_type, amount, asof,comment=None):
        """Deposit to account.

        uid (uuid.UUID):
            Account public identifier.
        deposited_by (User):
            Deposited by.
        amount (positive int):
            Amount to deposit.
        asof (datetime.datetime):
            Time of deposit.
        comment(str or None):
        Optional comment.

        Raises
            Account.DoesNotExist
            InvalidAmount
            ExceedsLimit

        Returns (tuple):
            [0] (Account) Updated account instance.
            [1] (Action) Deposit action.
        """
        assert amount > 0

        with transaction.atomic():
            account = cls.objects.select_for_update().get(uid=uid)

            if not (cls.MIN_DEPOSIT <= amount <= cls.MAX_DEPOSIT):
                raise InvalidAmount(amount)

            if account.balance + amount > cls.MAX_BALANCE:
                raise ExceedsLimit()

            total = cls.objects.aggregate(total=Sum('balance'))['total']
            if total + amount > cls.MAX_TOTAL_BALANCES:
                raise ExceedsLimit()

            account.balance += amount
            account.modified = asof

            account.save(update_fields=[
                'balance',
                'modified',
            ])

            action = Action.create(
                user=deposited_by,
                account=account,
                type=Action.ACTION_TYPE_DEPOSITED,
                reference=reference,
                reference_type=reference_type,
                delta=amount,
                asof=asof,
            )

        return account, action

    @classmethod
    def withdraw(cls, uid, withdrawn_by, amount, asof, comment=None):
        """Withdraw from account.

        uid (uuid.UUID):
            Account public identifier.
        withdrawn_by (User):
            The withdrawing user.
        amount (positive int):
            Amount to withdraw.
        asof (datetime.datetime):
            Time of withdraw.
        comment (str or None):
        Optional comment.

        Raises:
            Account.DoesNotExist
            InvalidAmount
            InsufficientFunds

        Returns (tuple):
            [0] (Account) Updated account instance.
            [1] (Action) Withdraw action.
        """
        assert amount > 0

        with transaction.atomic():
            account = cls.objects.select_for_update().get(uid=uid)

            if not (cls.MIN_WITHDRAW <= amount <= cls.MAX_WITHDRAW):
                raise InvalidAmount(amount)

            if account.balance - amount < cls.MIN_BALANCE:
                raise InsufficientFunds(amount, account.balance)

            account.balance -= amount
            account.modified = asof

            account.save(update_fields=[
                'balance',
                'modified',
            ])

            action = Action.create(
                user=withdrawn_by,
                account=account,
                type=Action.ACTION_TYPE_WITHDRAWN,
                delta=-amount,
                asof=asof,
            )

        return account, action

    # def deposit(self, amount, deposited_by, asof):
    #     assert amount > 0

    #     if not self.MIN_DEPOSIT <= amount <= self.MAX_DEPOSIT:
    #         raise InvalidAmount(amount)

    #     if self.balance + amount > self.MAX_BALANCE:
    #         raise ExceedsLimit()

    #     total = self.balance.objects.aggregate(
    #         total=Sum('balance')
    #     )['total']
    #     if total + amount > self.MAX_TOTAL_BALANCES:
    #         raise ExceedsLimit()

    #     action = self.actions.create(
    #         user=deposited_by,
    #         type=Action.ACTION_TYPE_DEPOSITED,
    #         delta=amount,
    #         asof=asof,
    #     )

    #     self.balance += amount
    #     self.modified = asof

    #     self.save()

    # def withdrawal(self, amount, withdraw_by, asof):
    #     assert amount > 0

    #     if not self.MIN_WITHDRAW <= amount <= self.MAX_WITHDRAW:
    #         raise InvalidAmount(amount)

    #     if self.balance - amount > self.MIN_BALANCE:
    #         raise ExceedsLimit()

    #     total = self.balance.objects.aggregate(
    #         total=Sum('balance')
    #     )['total']
    #     if total + amount > self.MAX_TOTAL_BALANCES:
    #         raise ExceedsLimit()

    #     action = self.actions.create(
    #         user=withdraw_by,
    #         type=Action.ACTION_TYPE_WITHDRAWN,
    #         delta=amount,
    #         asof=asof,
    #     )

    #     self.balance -= amount
    #     self.modified = asof

    #     self.save()

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def update_user_account(sender, instance, created, **kwargs):
    """
        Create an balance account on signup
        """
    if created:
        Account.objects.create(user=instance)
    instance.account.save()


class Action(models.Model):
    class Meta:
        verbose_name = 'Account action'
        verbose_name_plural = 'Account actions'

    ACTION_TYPE_CREATED = 'CREATED'
    ACTION_TYPE_DEPOSITED = 'DEPOSITED'
    ACTION_TYPE_WITHDRAWN = 'WITHDRAWN'
    ACTION_TYPE_CHOICES = (
        (ACTION_TYPE_CREATED, 'Created'),
        (ACTION_TYPE_DEPOSITED, 'Deposited'),
        (ACTION_TYPE_WITHDRAWN, 'Withdrawn'),
    )

    REFERENCE_TYPE_BANK_TRANSFER = 'BANK_TRANSFER'
    REFERENCE_TYPE_CHECK = 'CHECK'
    REFERENCE_TYPE_CASH = 'CASH'
    REFRENCE_TYPE_NONE = 'NONE'
    REFERENCE_TYPE_CHOICES = (
        (REFERENCE_TYPE_BANK_TRANSFER, 'Bank transfer'),
        (REFERENCE_TYPE_CHECK, 'Check'),
        (REFERENCE_TYPE_CASH, 'Cash'),
        (REFRENCE_TYPE_NONE, 'None'),
    )

    id = models.AutoField(primary_key=True)
    user_friendly_id = models.UUIDField(
        unique=True, editable=False, max_length=30, blank=True, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, help_text='User on make an action')
    created = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=ACTION_TYPE_CHOICES, default=REFRENCE_TYPE_NONE)
    delta = models.IntegerField(help_text='Balance delta.')
    reference = models.TextField(blank=True)
    reference_type = models.CharField(
        max_length=30, choices=REFERENCE_TYPE_CHOICES, default=REFRENCE_TYPE_NONE)
    comment = models.TextField(blank=True)
    debug_balance = models.IntegerField(help_text='Balance after action')

    @classmethod
    def create(cls, user, account, type, delta, asof, reference=None, reference_type=None, comment=None):
        """Create Action.

        user (User):
            User who executed the action.
        account (Account):
            Account the action executed on.
        type (str, one of Action.ACTION_TYPE_\*):
            Type of action.
        delta (int):
            Change in balance.
        asof (datetime.datetime):
            When was the action executed.
        reference (str or None):
            Reference number when appropriate.
        reference_type(str or None):
            Type of reference.
            Defaults to "NONE".
        comment (str or None):
            Optional comment on the action.

        Raises:
            ValidationError

        Returns (Action)
        """
        assert asof is not None

        if (type == cls.ACTION_TYPE_DEPOSITED and
                reference_type is None):
            raise ValidationError({
                'reference_type': 'required for deposit.',
            })

        if reference_type is None:
            reference_type = cls.REFRENCE_TYPE_NONE

        # Don't store null in text field.

        if reference is None:
            reference = ''

        if comment is None:
            comment = ''

        user_friendly_id = ''

        return cls.objects.create(
            # user_friendly_id=user_friendly_id,
            created=asof,
            user=user,
            account=account,
            type=type,
            delta=delta,
            reference=reference,
            reference_type=reference_type,
            comment=comment,
            debug_balance=account.balance,
        )

    def __str__(self):
        return self.reference_type
