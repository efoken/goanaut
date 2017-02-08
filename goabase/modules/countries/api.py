from tastypie import fields
from tastypie.contrib.gis.resources import ModelResource

from goabase.modules.countries.models import Country


class CountryResource(ModelResource):
    parties = fields.ToManyField('goabase.modules.parties.api.PartyResource', 'party_set', related_name='country')

    class Meta:
        queryset = Country.objects.all()
        resource_name = 'country'
        fields = ['id', 'iso2', 'iso3', 'name']
