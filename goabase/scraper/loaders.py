import re

from dateutil import parser
from scrapy.loader import ItemLoader
from scrapy.loader.processors import Compose, MapCompose, TakeFirst


def filter_type(value):
    value = re.sub(r'[^\w]+', '_', value.lower()).replace('open_air', 'openair')
    return value.replace('in_outdoor', 'indoor_outdoor')


class PartyLoader(ItemLoader):
    default_output_processor = TakeFirst()

    start_date_in = MapCompose(parser.parse)
    end_date_in = MapCompose(parser.parse)
    type_in = MapCompose(filter_type)
    location_in = Compose(lambda v: 'POINT(%s %s)' % tuple(v))
