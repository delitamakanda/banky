from unittest import mock
from django.test import TestCase

from .common import TestAccountBase
from api.models import Account, Action
from api.errors import (
    InvalidAmount,
    ExceedsLimit,
    InsufficientFunds,
)


class TestAccount(TestAccountBase, TestCase):

    def setUp(self, cls):
        self.account, _ = cls.create()

    def test_should_start_with_zero_balance(self):
        self.assertEqual(self.account.balance, 0)

    def test_should_deposit(self):
        self.deposit(100)
        self.assertEqual(self.account.balance, 100)
        self.deposit(150)
        self.assertEqual(self.account.balance, 250)

    def test_should_fail_to_deposit_less_than_minimum(self):
        with self.assertRaises(InvalidAmount):
            self.deposit(Account.MIN_DEPOSIT - 1)
        self.assertEqual(self.account.balance, 0)

    def test_should_fail_to_deposit_more_than_maximum(self):
        with self.assertRaises(InvalidAmount):
            self.deposit(Account.MAX_DEPOSIT + 1)
        self.assertEqual(self.account.balance, 0)

    @mock.patch('account.models.Account.MAX_BALANCE', 500)
    @mock.patch('account.models.Account.MAX_DEPOSIT', 502)
    def test_should_fail_to_deposit_more_than_max_balance(self):
        with self.assertRaises(ExceedsLimit):
            self.deposit(501)
        self.assertEqual(self.account.balance, 0)

    @mock.patch('account.models.Account.MAX_BALANCE', 500)
    @mock.patch('account.models.Account.MAX_DEPOSIT', 500)
    @mock.patch('account.models.Account.MAX_TOTAL_BALANCES', 600)
    def test_should_fail_when_exceed_max_total_balances(self):

        # Exceed max total balances for the same account

        self.deposit(500)
        with self.assertRaises(ExceedsLimit):
            self.deposit(500)
        self.assertEqual(self.account.balance, 500)

        # Exceed max total balances in other account

        other_user = User.objects.create_user('foo', 'bar', 'baz')
        other_account = self.create(user=other_user)

        with self.assertRaises(ExceedsLimit):
            self.deposit(200, account=other_account)
        self.assertEqual(other_account.balance, 0)

    def test_should_withdraw(self):
        self.deposit(100)
        self.withdraw(50)
        self.assertEqual(self.account.balance, 50)
        self.withdraw(30)
        self.assertEqual(self.account.balance, 20)

    def test_should_fail_when_insufficient_funds(self):
        self.deposit(100)
        with self.assertRaises(InsufficientFunds):
            self.withdraw(101)
        self.assertEqual(self.account.balance, 100)
