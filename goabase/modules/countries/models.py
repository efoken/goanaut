from django.contrib.gis.db import models
from django.utils.translation import ugettext_lazy as _


class Country(models.Model):
    fips = models.CharField(_('FIPS code'), max_length=2)
    iso2 = models.CharField(_('2 digit ISO'), max_length=2)
    iso3 = models.CharField(_('3 digit ISO'), max_length=3)
    un = models.IntegerField(_('United Nations code'))
    name = models.CharField(_('name'), max_length=50)
    area = models.IntegerField(_('area'))
    pop2005 = models.BigIntegerField(_('population in 2005'))
    region = models.IntegerField(_('region code'))
    subregion = models.IntegerField(_('sub-region code'))
    lon = models.FloatField(_('longitude'))
    lat = models.FloatField(_('latitude'))
    geom = models.MultiPolygonField(srid=4326, null=True)

    objects = models.GeoManager()

    class Meta:
        verbose_name = _('country')
        verbose_name_plural = _('countries')

    def __str__(self):
        return self.name


# Auto-generated `LayerMapping` dictionary for Country model
country_mapping = {
    'fips': 'FIPS',
    'iso2': 'ISO2',
    'iso3': 'ISO3',
    'un': 'UN',
    'name': 'NAME',
    'area': 'AREA',
    'pop2005': 'POP2005',
    'region': 'REGION',
    'subregion': 'SUBREGION',
    'lon': 'LON',
    'lat': 'LAT',
    'geom': 'MULTIPOLYGON',
}
