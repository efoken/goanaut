from django.contrib import admin

from goabase.parties.models import Party


@admin.register(Party)
class PartyAdmin(admin.ModelAdmin):
    pass
