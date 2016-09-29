import json
import scrapy

from dateutil import parser, tz
from django.utils import timezone


class GoabaseSpider(scrapy.Spider):
    name = 'goabase'
    allowed_domains = ['www.goabase.net']
    start_urls = (
        'https://www.goabase.net/api/party/json/',
    )

    def parse(self, response):
        party_json = json.loads(response.body.decode())
        if 'partylist' in party_json:
            for party in party_json['partylist']:
                yield scrapy.Request(party['urlPartyJson'],
                                     callback=self.parse_party)

    def parse_party(self, response):
        party_json = json.loads(response.body.decode())
        if 'party' in party_json:
            party = party_json['party']
            current_tz = timezone.get_current_timezone()
            return {
                'id': party['id'],
                'name': party['nameParty'],
                'start_date': parser.parse(party['dateStart']).astimezone(current_tz),
                'end_date': parser.parse(party['dateEnd']).astimezone(current_tz),
            }
