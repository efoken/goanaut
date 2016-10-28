from tastypie.contrib.gis.resources import ModelResource

from goabase.modules.parties.models import Party


class PartyResource(ModelResource):
    class Meta:
        queryset = Party.objects.all()
        resource_name = 'party'
