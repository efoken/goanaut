from goabase.conf.settings.common import *  #noqa

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY')


# Email
# https://docs.djangoproject.com/en/dev/topics/email/

DEFAULT_FROM_EMAIL = env('DJANGO_DEFAULT_FROM_EMAIL',
                         default='GoaBase <noreply@goaba.se>')
EMAIL_SUBJECT_PREFIX = env('DJANGO_EMAIL_SUBJECT_PREFIX', default='[GoaBase] ')
SERVER_EMAIL = env('DJANGO_SERVER_EMAIL', default=DEFAULT_FROM_EMAIL)

# Anymail with SparkPost
INSTALLED_APPS += ['anymail']
ANYMAIL = {
    'SPARKPOST_API_KEY': env('DJANGO_SPARKPOST_API_KEY'),
}
EMAIL_BACKEND = 'anymail.backends.sparkpost.SparkPostBackend'


# Cached template loader
# See https://docs.djangoproject.com/en/dev/ref/templates/api/#django.template.loaders.cached.Loader

TEMPLATES[0]['OPTIONS']['loaders'] = [
    ('django.template.loaders.cached.Loader', [
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    ]),
]
