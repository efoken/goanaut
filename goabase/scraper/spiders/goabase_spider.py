import json
import scrapy

from goabase.modules.parties.models import PartyItem
from goabase.scraper.loaders import PartyLoader


class GoabaseSpider(scrapy.Spider):
    name = 'goabase_spider'
    conf = {
        'DO_ACTION': True
    }
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
            l = PartyLoader(item=PartyItem(), response=response)
            l.add_value('name', party['nameParty'])
            l.add_value('start_date', party['dateStart'])
            l.add_value('end_date', party['dateEnd'])
            l.add_value('type', party['nameType'])
            l.add_value('town', party['nameTown'])
            l.add_value('location', [party['geoLon'], party['geoLat']])
            l.add_value('lineup', party['textLineUp'])
            l.add_value('decoration', party['textDeco'])
            l.add_value('entry_fee', party['textEntryFee'])
            l.add_value('more', party['textMore'])
            l.add_value('organizer_name', party['nameOrganizer'])
            l.add_value('organizer_text', party['textOrganizer'])
            l.add_value('organizer_url', party['urlOrganizer'])
            return l.load_item()
