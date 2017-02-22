import re

from dateutil import parser
from scrapy.loader import ItemLoader
from scrapy.loader.processors import Compose, MapCompose, TakeFirst

from goabase.modules.countries.models import Country


def filter_type(value):
    value = re.sub(r'[^\w]+', '_', value.lower()).replace('open_air', 'openair')
    return value.replace('in_outdoor', 'indoor_outdoor')


def select_country(value):
    try:
        return Country.objects.get(iso2=value)
    except Country.DoesNotExist:
        return None


class PartyLoader(ItemLoader):
    default_output_processor = TakeFirst()

    start_date_in = MapCompose(parser.parse)
    end_date_in = MapCompose(parser.parse)
    type_in = MapCompose(filter_type)
    country_in = MapCompose(select_country)
    location_in = Compose(lambda v: 'POINT(%s %s)' % tuple(v))
