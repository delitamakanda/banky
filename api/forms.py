from django import forms
from django.core.mail import send_mail
from django.utils import timezone
from .models import Account, Action


class AccountActionForm(forms.Form):
    comment = forms.CharField(
        required=False,
        widget=forms.Textarea,
    )
    send_email = forms.BooleanField(
        required=False,
    )

    @property
    def email_body_template(self):
        raise NotImplementedError()

    def form_action(self, account, user):
        raise NotImplementedError()

    def save(self, account, user):
        try:
            account, action = self.form_action(account, user)
        except:
            error_message = 'Error'
            self.add_error(None, error_message)
            raise

        if self.cleaned_data.get('send_email', False):
            send_mail(
                subject='Notification sent.',
                message=self.email_body_template,
                from_email='no-reply@banky.com',
                recipient_list=[account.user.email],
            )

        return action, account


class WithdrawForm(AccountActionForm):
    amount = forms.IntegerField(
        min_value=Account.MIN_WITHDRAW,
        max_value=Account.MAX_WITHDRAW,
        required=True,
        help_text='Débit',
    )

    email_body_template = ''

    field_order = (
        'amount',
        'comment',
        'send_email',
    )

    def form_action(self, account, user):
        return Account.withdraw(
            uid=account.uid,
            # user=account.user,
            amount=self.cleaned_data['amount'],
            withdrawn_by=user,
            comment=self.cleaned_data['comment'],
            asof=timezone.now(),
        )


class DepositForm(AccountActionForm):
    amount = forms.IntegerField(
        min_value=Account.MIN_DEPOSIT,
        max_value=Account.MAX_DEPOSIT,
        required=True,
        help_text='Crédit',
    )
    reference_type = forms.ChoiceField(
        required=True,
        choices=Action.REFERENCE_TYPE_CHOICES,
    )
    reference = forms.CharField(
        required=False,
    )

    email_body_template = ''

    field_order = (
        'amount',
        'reference_type',
        'reference',
        'comment',
        'send_email',
    )

    def form_action(self, account, user):
        return Account.deposit(
            uid=account.uid,
            amount=self.cleaned_data['amount'],
            deposited_by=user,
            reference=self.cleaned_data['reference'],
            reference_type=self.cleaned_data['reference_type'],
            comment=self.cleaned_data['comment'],
            asof=timezone.now(),
        )
