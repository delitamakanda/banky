from django.contrib import admin
from .models import Account, Action, Transaction, Product, KeysPerformanceIndicator
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse
from .forms import DepositForm, WithdrawForm
from django.utils.html import format_html
from django.urls import reverse
from django.urls import path
from .errors import Error


class AccountAdmin(admin.ModelAdmin):
    list_display = ['uid', 'user', 'balance', 'account_actions', ]
    readonly_fields = (
        'uid',
        'user',
        'modified',
        'balance',
        'account_actions',
    )
    date_hierarchy = 'modified'
    list_filter = ('created', 'modified',)
    search_fields = ['uid', 'user', ]

    list_select_related = (
        'user',
    )

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '<str:account_id>/deposit/',
                self.admin_site.admin_view(self.process_deposit),
                name='account-deposit',
            ),
            path(
                '<str:account_id>/withdraw/',
                self.admin_site.admin_view(self.process_withdraw),
                name='account-withdraw',
            ),
        ]
        return custom_urls + urls

    def account_actions(self, obj):
        return format_html(
            '<a class="button" href="{}">Deposit</a>&nbsp;'
            '<a class="button" href="{}">Withdraw</a>',
            reverse('admin:account-deposit', args=[obj.pk]),
            reverse('admin:account-withdraw', args=[obj.pk]),
        )

    account_actions.short_description = 'Account Actions'
    account_actions.allow_tags = True

    def process_deposit(self, request, account_id, *args, **kwargs):
        return self.process_action(
            request=request,
            account_id=account_id,
            action_form=DepositForm,
            action_title='Deposit',
        )
        
    def process_withdraw(self, request, account_id, *args, **kwargs):
        return self.process_action(
            request=request,
            account_id=account_id,
            action_form=WithdrawForm,
            action_title='Withdraw',
        )
        
    def process_action(self,request,account_id,action_form,action_title):
        account = self.get_object(request, account_id)

        if request.method != 'POST':
            form = action_form()

        else:
            form = action_form(request.POST)
            if form.is_valid():
                try:
                    form.save(account, request.user)
                except Error as e:
                    # If save() raised, the form will a have a non
                    # field error containing an informative message.
                    pass
                else:
                    self.message_user(request, 'Success')
                    url = reverse(
                        'admin:api_account_change',
                       args=[account.pk],
                        current_app=self.admin_site.name,
                    )
                    return HttpResponseRedirect(url)

        context = self.admin_site.each_context(request)
        context['opts'] = self.model._meta
        context['form'] = form
        context['account'] = account
        context['title'] = action_title

        return TemplateResponse(
            request,
            'admin/account/account_action.html',
            context,
        )

class ActionAdmin(admin.ModelAdmin):
    list_display=['type','user_friendly_id', 'user', 'created']
    date_hierarchy='created'
    list_filter=('type',)
    search_fields=['type', 'comment', ]


admin.site.register(Action, ActionAdmin)
admin.site.register(Account, AccountAdmin)
admin.site.register(Transaction)
admin.site.register(Product)
admin.site.register(KeysPerformanceIndicator)
