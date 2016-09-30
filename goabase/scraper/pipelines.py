import datetime
import json
import logging

from django.db.utils import IntegrityError
from scrapy.exceptions import DropItem


class JsonWriterPipeline(object):
    def __init__(self):
        self.file = open('items.jsonl', 'wb')

    def process_item(self, item, spider):
        def json_serial(obj):
            if isinstance(obj, datetime.datetime):
                serial = obj.isoformat()
                return serial
            raise TypeError('Type not serializable')

        line = json.dumps(dict(item), default=json_serial) + "\n"
        # line = str(dict(item)) + "\n"
        self.file.write(line.encode())
        return item


class DjangoWriterPipeline(object):
    def process_item(self, item, spider):
        if spider.conf['DO_ACTION']:
            try:
                # item['source'] = spider.ref_object
                item.save()
                spider.action_successful = True
                spider.log('Item saved.', logging.INFO)

            except IntegrityError as e:
                spider.log(str(e), logging.ERROR)
                spider.log(str(item._errors), logging.ERROR)
                raise DropItem('Missing attribute.')
        else:
            if not item.is_valid():
                spider.log(str(item._errors), logging.ERROR)
                raise DropItem('Missing attribute.')

        return item
