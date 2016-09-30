from django.contrib.gis.admin.options import OSMGeoAdmin


class GoogleMapsGeoAdmin(OSMGeoAdmin):
    extra_js = [
        'https://maps.google.com/maps/api/js?v=3&key=AIzaSyBiuQK_xDqFZ99YahdloDMQMbnRAiGovsQ'
    ]
    map_template = 'gis/admin/google.html'
    openlayers_url = 'http://dev.openlayers.org/OpenLayers.js'
