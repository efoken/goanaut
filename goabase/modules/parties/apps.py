from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class PartiesConfig(AppConfig):
    name = 'goabase.modules.parties'
    verbose_name = _('Parties')
