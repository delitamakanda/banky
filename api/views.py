from django.db import transaction
from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from api.models import Account
from api.models import Action
from api.models import Transaction, Product, KeysPerformanceIndicator
from api.serializers import TransactionSerializer, ProductSerializer, KeysPerformanceIndicatorSerializer
from api.serializers import ActionSerializer
from api.serializers import AccountSerializer
from api.serializers import UserSerializer

from rest_framework import viewsets, status, response, permissions, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from .errors import InvalidAmount, ExceedsLimit


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post']

    def get_queryset(self):
        queryset = Transaction.objects.filter(buyer=self.request.user).order_by('-id')
        return queryset


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post']


class KeysPerformanceIndicatorViewSet(viewsets.ModelViewSet):
    queryset = KeysPerformanceIndicator.objects.all()
    serializer_class = KeysPerformanceIndicatorSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post']

        

class ActionViewSet(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        account = Account.objects.get(user=self.request.user)
        queryset = self.queryset
        query_set = queryset.filter(account=account).order_by('-id')
        return query_set



class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set


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


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


@api_view(['POST'])
def deposit(request):
    try:
        amount = int(request.data['amount'])
    except (KeyError, ValueError):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        try:
            account = (
                Account.objects
                .select_for_update()
                .get(user=request.user)
            )
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            account.deposit(
                uid=account.uid,
                reference='',
                reference_type=Action.REFRENCE_TYPE_NONE,
                amount=amount,
                deposited_by=request.user,
                asof=timezone.now(),
            )
        except (ExceedsLimit, InvalidAmount):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def withdraw(request):
    try:
        amount = int(request.data['amount'])
    except (KeyError, ValueError):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        try:
            account = (
                Account.objects
                .select_for_update()
                .get(user=request.user)
            )
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            account.withdraw(
                uid=account.uid,
                amount=amount,
                withdrawn_by=request.user,
                asof=timezone.now(),
            )
        except (ExceedsLimit, InvalidAmount):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
