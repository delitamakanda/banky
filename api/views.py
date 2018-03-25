from django.shortcuts import render
from django.contrib.auth.models import User
from api.models import Account
from api.models import Action
from api.serializers import ActionSerializer
from api.serializers import AccountSerializer
from api.serializers import UserSerializer

from rest_framework import viewsets, status, response, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

# Create your views here.
class ActionViewSet(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    permission_classes = (IsAuthenticated,)


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = ()

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticated(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return response.Response(UserSerializer(request.user, context={'request': request}).data)

        return super(UserViewSet, self).retrieve(request, pk)
