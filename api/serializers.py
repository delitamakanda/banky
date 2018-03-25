from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.utils.timezone import now
from django.contrib.auth.models import User
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

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    # username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    # password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(
            **validated_data
            #validated_data['username'],
            #validated_data['email'],
            #validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            # 'first_name',
            # 'last_name',
            'email',
            'password',
            # 'auth_token',
            'date_joined',
        )
