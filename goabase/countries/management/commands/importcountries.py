from django.contrib.gis.utils import LayerMapping
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils.translation import ugettext_lazy as _

from goabase.countries.models import Country, country_mapping


class Command(BaseCommand):
    help = 'Used to import country GEO data.'

    def handle(self, *args, **kwargs):
        with transaction.atomic():
            lm = LayerMapping(Country, 'TM_WORLD_BORDERS-0.3.shp', country_mapping,
                              encoding='iso-8859-1')
            lm.save(strict=True, verbose=True)
