from tastypie import fields
from tastypie.contrib.gis.resources import ModelResource

from goabase.modules.countries.api import CountryResource
from goabase.modules.parties.models import Party


class PartyResource(ModelResource):
    country = fields.ForeignKey(CountryResource, 'country', full=True)

    class Meta:
        queryset = Party.objects.all()
        resource_name = 'party'
