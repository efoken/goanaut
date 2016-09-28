from django.contrib import admin

from goabase.countries.models import Country


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    pass
