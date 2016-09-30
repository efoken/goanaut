from django.contrib.gis import admin
from django.contrib.humanize.templatetags.humanize import intcomma

from goabase.core.admin import GoogleMapsGeoAdmin
from goabase.modules.countries.models import Country


@admin.register(Country)
class CountryAdmin(GoogleMapsGeoAdmin):
    list_display = ['name', 'view_area', 'iso2', 'iso3', 'un', 'fips']

    def view_area(self, obj):
        return '%s km²' % intcomma(obj.area * 10)
