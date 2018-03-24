from rest_framework import serializers
from django.utils.timezone import now
from api.models import Account, Action

class ToUpperCaseCharField(serializers.CharField):

    def to_representation(self, value):
        return value.upper()


class AccountSerializer(serializers.ModelSerializer):
    days_since_created = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = (
            'id',
            'uid',
            'user',
            'created',
            'modified',
            'balance',
            'days_since_created',
        )

    def get_days_since_created(self, obj):
        return (now() - obj.created).days


class ActionSerializer(serializers.ModelSerializer):
    reference = ToUpperCaseCharField()

    class Meta:
        model = Action
        fields = (
            'id',
            'user_friendly_id',
            'user',
            'created',
            'account',
            'type',
            'delta',
            'reference',
            'reference_type',
            'comment',
            'debug_balance',
        )
