{% extends "gis/admin/openlayers.js" %}
{% block base_layer %}new OpenLayers.Layer.Google('Google Streets', {numZoomLevels: 20, units: 'm'});{% endblock %}
{% block extra_layers %}
{{ module }}.layers.overlay = new OpenLayers.Layer.Google('Google Satellite', {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 20, units: 'm'});
{{ module }}.map.addLayer({{ module }}.layers.overlay);
{% endblock %}
