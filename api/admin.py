from django.contrib import admin
from api.models import Account
from api.models import Action

# Register your models here.


class AccountAdmin(admin.ModelAdmin):
    list_display = ['uid', 'user', 'created']
    date_hierarchy = 'created'
    list_filter = ('created', 'modified',)
    search_fields = ['uid', 'user',]



class ActionAdmin(admin.ModelAdmin):
    list_display = ['user_friendly_id', 'user', 'created']
    date_hierarchy = 'created'
    list_filter = ('user', 'reference',)
    search_fields = ['reference', 'comment',]

admin.site.register(Action, ActionAdmin)
admin.site.register(Account, AccountAdmin)
