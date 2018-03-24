from django.contrib import admin
from api.models import Account, Action
# Register your models here.

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['uid', 'user', 'created']
    date_hierarchy = 'created'
    list_filter = ('user', 'balance',)
    search_fields = ['uid', 'user',]


@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    list_display = ['user_friendly_id', 'user', 'created']
    date_hierarchy = 'created'
    list_filter = ('user', 'reference',)
    search_fields = ['reference', 'comment',]
