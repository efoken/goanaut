from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class CountriesConfig(AppConfig):
    name = 'goabase.modules.countries'
    verbose_name = _('Countries')
