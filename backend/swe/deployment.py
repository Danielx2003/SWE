import os
from .settings import *
from .settings import BASE_DIR

DEBUG = False
SECRET_KEY= os.environ['MY_SECRET_KEY']

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
# SECURE_SSL_REDIRECT = True
# SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
# CSRF_TRUSTED_ORIGINS = ['https://exe-garden.azurewebsites.net']


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.whiteNoiseMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage"
    },
    "staticfiles": {
        "BACKEND": 'whitenoise.storage.CompressedStaticFilesStorage'
    }
}

CONNECTION = os.environ(['AZURE_POSTGRESQL_CONNECTIONSTRING'])

CONNECTION_STR = {
    pair.split('=')[0]: pair.split('=')[1] for pair in CONNECTION.split(' ')
}

DATABASES ={
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': CONNECTION_STR['dbname'],
        'HOST': CONNECTION_STR['host'],
        'USER': CONNECTION_STR['user'],
        'PASSWORD': CONNECTION_STR['password']
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
