import datetime
import hashlib
import json
import logging

from django.db.models import Model
from django.db.utils import IntegrityError
from scrapy.exceptions import DropItem
from scrapy.pipelines.images import ImagesPipeline
from scrapy.utils.project import get_project_settings
from scrapy.utils.python import to_bytes

settings = get_project_settings()


class DjangoImagesPipeline(ImagesPipeline):
    def __init__(self, *args, **kwargs):
        super(DjangoImagesPipeline,  self).__init__(*args, **kwargs)
        self.thumbs = settings.get('IMAGES_THUMBS', {})

    def file_path(self, request, response=None, info=None):
        url = request.url
        image_guid = hashlib.sha1(to_bytes(url)).hexdigest()
        if self.conf['IMAGES_STORE_FORMAT'] == 'FLAT':
            return '{ig}.jpg'.format(ig=image_guid)
        elif self.conf['IMAGES_STORE_FORMAT'] == 'THUMBS':
            return 'thumbs/{p}/{ig}.jpg'.format(p=next(iter(list(self.thumbs.keys()))),
                                                ig=image_guid)
        return 'full/{ig}.jpg'.format(ig=image_guid)

    def thumb_path(self, request, thumb_id, response=None, info=None):
        url = request.url
        image_guid = hashlib.sha1(to_bytes(url)).hexdigest()
        if self.conf['IMAGES_STORE_FORMAT'] == 'FLAT':
            return '{ig}.jpg'.format(ig=image_guid)
        else:
            return 'thumbs/{p}/{ig}.jpg'.format(p=thumb_id, ig=image_guid)


class DuplicationPipeline(object):
    def process_item(self, item, spider):
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


class JsonWriterPipeline(object):
    def __init__(self):
        self.file = open('items.jsonl', 'wb')

    def process_item(self, item, spider):
        def json_serial(obj):
            if isinstance(obj, datetime.datetime):
                serial = obj.isoformat()
                return serial
            if isinstance(obj, Model):
                return str(obj)
            raise TypeError('Type not serializable')

        line = json.dumps(dict(item), default=json_serial) + "\n"
        self.file.write(line.encode())
        return item
