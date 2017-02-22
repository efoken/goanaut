# flake8: noqa
from goabase.conf.settings.base import *  # noqa

DEBUG = env.bool('DJANGO_DEBUG', default=True)
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG
WEBPACK_LOADER['DEFAULT']['CACHE'] = not DEBUG

SECRET_KEY = env('DJANGO_SECRET_KEY', default='*nz0dz15ix%5&#+k-r58tf24)@j#df5bx_x9=lpk^h_aw3=98o')


# Email
# https://docs.djangoproject.com/en/dev/topics/email/

EMAIL_PORT = 1025
EMAIL_HOST = env('EMAIL_HOST', default='localhost')


# Cache
# https://docs.djangoproject.com/en/1.10/topics/cache/

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': '',
    }
}

INSTALLED_APPS += ['django_extensions']
