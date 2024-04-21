from .base import *
import dj_database_url

DATABASES['default'] = dj_database_url.config()
DATABASES['default']['CONN_MAX_AGE'] = 60
DATABASES['default']['ATOMIC_REQUESTS'] = True

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

DEBUG = os.getenv('DEBUG') == 'True'

SECRET_KEY = os.getenv('SECRET_KEY')


ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS').split(',')

ADMINS = [(os.getenv('ADMIN_NAME'), os.getenv('ADMIN_EMAIL'))]

STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

SECURE_HSTS_SECONDS = 60 * 60 * 24 * 7
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_REFERRER_POLICY = 'strict-origin'

SERVER_EMAIL = os.getenv('SERVER_EMAIL')

DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL')