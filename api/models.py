import uuid
from django.conf import settings
from django.db import models

# Create your models here.
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
    uid = models.UUIDField(unique=True,editable=False,default=uuid.uuid4, verbose_name='Public identifier')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    created = models.DateTimeField(blank=True)
    modified = models.DateTimeField(blank=True)
    balance = models.PositiveIntegerField(verbose_name='Current balance')

    def deposit(self, amount, deposited_by, asof):
        assert amount > 0

        if not self.MIN_DEPOSIT <= amount <= self.MAX_DEPOSIT:
            raise InvalidAmount(amount)

        if self.balance + amount > self.MAX_BALANCE:
            raise ExceedsLimit()

        total = Balance.objects.aggregate(
            total=Sum('balance')
        )['total']
        if total + amount > self.MAX_TOTAL_BALANCES:
            raise ExceedsLimit()

        action = self.actions.create(
            user=deposited_by,
            type=Action.ACTION_TYPE_DEPOSITED,
            delta=amount,
            asof=asof,
        )

        self.balance += amount
        self.modified = asof

        self.save()

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
    user_friendly_id = models.UUIDField(unique=True,editable=False,max_length=30)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, help_text='User on make an action')
    created = models.DateTimeField(blank=True)
    account = models.ForeignKey(Account)
    type = models.CharField(max_length=30,choices=ACTION_TYPE_CHOICES)
    delta = models.IntegerField(help_text='Balance delta.')
    reference = models.TextField(blank=True)
    reference_type = models.CharField(max_length=30, choices=REFERENCE_TYPE_CHOICES, default=REFRENCE_TYPE_NONE)
    comment = models.TextField(blank=True)
    debug_balance = models.IntegerField(help_text='Balance after action')
