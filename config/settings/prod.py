from decouple import Csv
from config.settings.base import * #noqa
import dj_database_url

DATABASE_URL = config("DATABASE_URL", default=None)
database_config = dj_database_url.config(
    default=DATABASE_URL,
    conn_max_age=60,
)
if database_config:
    DATABASES['default'].update(database_config)
DATABASES['default']['ATOMIC_REQUESTS'] = True

DEBUG = config('DEBUG', cast=bool, default=False)

SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = [
    host for host in config('ALLOWED_HOSTS', cast=Csv(), default='') if host
]

ADMIN_NAME = config('ADMIN_NAME', default=None)
ADMIN_EMAIL = config('ADMIN_EMAIL', default=None)
if ADMIN_NAME and ADMIN_EMAIL:
    ADMINS = [(ADMIN_NAME, ADMIN_EMAIL)]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', cast=bool, default=True)
SESSION_COOKIE_SECURE = config(
    'SESSION_COOKIE_SECURE', cast=bool, default=True
)
CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', cast=bool, default=True)
SECURE_HSTS_SECONDS = config(
    'SECURE_HSTS_SECONDS', cast=int, default=60 * 60 * 24 * 7
)
SECURE_HSTS_INCLUDE_SUBDOMAINS = config(
    'SECURE_HSTS_INCLUDE_SUBDOMAINS', cast=bool, default=True
)
SECURE_HSTS_PRELOAD = config('SECURE_HSTS_PRELOAD', cast=bool, default=True)
SECURE_REFERRER_POLICY = config('SECURE_REFERRER_POLICY', default='strict-origin')

SERVER_EMAIL = config('SERVER_EMAIL', default=None)
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default=SERVER_EMAIL)
