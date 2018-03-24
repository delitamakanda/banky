from django.shortcuts import render
from api.models import Account
from api.models import Action
from api.serializers import ActionSerializer
from api.serializers import AccountSerializer

from rest_framework import viewsets

# Create your views here.
class ActionViewSet(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
