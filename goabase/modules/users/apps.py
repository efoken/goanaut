from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class UsersConfig(AppConfig):
    name = 'goabase.modules.users'
    verbose_name = _('Users')

    def ready(self):
        from goabase.modules.users.models import User
        User._meta.get_field('email')._unique = True
        User._meta.get_field('email').blank = False
