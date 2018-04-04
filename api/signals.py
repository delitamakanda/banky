from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver

from api.models import Account

from rest_framework.authtoken.models import Token

@receiver(post_save, sender=User)
def init_new_user(sender, instance, signal, created, **kwargs):
    """
    Create an authentication token for new users
    """
    if created:
        print('Token created')
        Token.objects.create(user=instance)
		

@receiver(post_save, sender=User)
def create_user_account(sender, instance, created, **kwargs):
	"""
	Create an balance account on signup
	"""
    if created:
        Account.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_account(sender, instance, **kwargs):
	"""
	save the account in db
	"""
    instance.account.save()
