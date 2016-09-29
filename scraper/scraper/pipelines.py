import json

from datetime import datetime


class ScraperPipeline(object):
    def process_item(self, item, spider):
        return item


class JsonWriterPipeline(object):
    def __init__(self):
        self.file = open('items.jsonl', 'wb')

    def process_item(self, item, spider):
        def json_serial(obj):
            if isinstance(obj, datetime):
                serial = obj.isoformat()
                return serial
            raise TypeError('Type not serializable')

        line = json.dumps(dict(item), default=json_serial) + "\n"
        self.file.write(line.encode())
        return item
