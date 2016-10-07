from goabase.conf.settings.common import *  #noqa

DEBUG = env.bool('DJANGO_DEBUG', default=True)
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

SECRET_KEY = env('DJANGO_SECRET_KEY', default='*nz0dz15ix%5&#+k-r58tf24)@j#df5bx_x9=lpk^h_aw3=98o')

EMAIL_PORT = 1025
EMAIL_HOST = env('EMAIL_HOST', default='localhost')

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': '',
    }
}

INSTALLED_APPS += ['django_extensions']
