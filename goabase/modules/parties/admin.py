from django.contrib.gis import admin

from goabase.core.admin import GoogleMapsGeoAdmin
from goabase.modules.parties.models import Party


@admin.register(Party)
class PartyAdmin(GoogleMapsGeoAdmin):
    list_display = ['name', 'type', 'start_date', 'end_date']
    date_hierarchy = 'start_date'
