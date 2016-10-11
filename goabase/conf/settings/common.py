import environ
import os
import platform

from django.utils.translation import ugettext_lazy as _

# Build paths inside the project like this: BASE_DIR.path(...)
BASE_DIR = environ.Path(__file__) - 4
PROJECT_DIR = BASE_DIR.path('goabase')

env = environ.Env()
env.read_env(env_file=BASE_DIR('.env'))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/dev/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DJANGO_DEBUG', False)

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'goabase.admin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.gis',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'crispy_forms',
    'el_pagination',
    'tastypie',
    'webpack_loader',
    'goabase.core',
    'goabase.modules.countries',
    'goabase.modules.parties',
    'goabase.modules.users',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'goabase.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            str(PROJECT_DIR.path('templates')),
        ],
        'OPTIONS': {
            'debug': False,
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ],
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
            ],
        },
    },
]

WSGI_APPLICATION = 'goabase.wsgi.application'

SITE_ID = 1


# Database
# https://docs.djangoproject.com/en/dev/ref/settings/#databases

DATABASES = {
    'default': env.db('DATABASE_URL', default='spatialite:///db.sqlite3')
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

if platform.system() == 'Darwin':
    SPATIALITE_LIBRARY_PATH = '/usr/local/lib/mod_spatialite.dylib'
else:
    SPATIALITE_LIBRARY_PATH = 'mod_spatialite'


# Password validation
# https://docs.djangoproject.com/en/dev/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Authentication backends
# See https://docs.djangoproject.com/en/dev/topics/auth/customizing/#authentication-backends

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'

ACCOUNT_ALLOW_REGISTRATION = env.bool('DJANGO_ACCOUNT_ALLOW_REGISTRATION', True)
ACCOUNT_ADAPTER = 'goabase.modules.users.adapters.AccountAdapter'
SOCIALACCOUNT_ADAPTER = 'goabase.modules.users.adapters.SocialAccountAdapter'

AUTH_USER_MODEL = 'users.User'
LOGIN_REDIRECT_URL = 'users:redirect'
LOGIN_URL = 'account_login'


# Internationalization
# https://docs.djangoproject.com/en/dev/topics/i18n/

LANGUAGE_CODE = 'en-us'

LANGUAGES = (
    ('en', _('English')),
    ('de', _('German')),
)

TIME_ZONE = 'Europe/Berlin'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOCALE_PATHS = (
    str(PROJECT_DIR.path('locale')),
)


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/dev/howto/static-files/

STATIC_ROOT = str(BASE_DIR.path('public/static'))

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    str(PROJECT_DIR.path('static')),
)

MEDIA_ROOT = str(BASE_DIR.path('public/media'))

MEDIA_URL = '/media/'

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': str(BASE_DIR.path('webpack-stats.json')),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}

# Endless pagination configuration
# https://django-el-pagination.readthedocs.io/en/latest/

EL_PAGINATION_DEFAULT_CALLABLE_EXTREMES = 1
EL_PAGINATION_DEFAULT_CALLABLE_AROUNDS = 2
