import pycountry

from django import forms


class CountryField(forms.ChoiceField):
    widget = forms.Select

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('choices', pycountry.countries)
        super(CountryField, self).__init__(*args, **kwargs)


class PointWidget(forms.gis.PointWidget, forms.gis.BaseGMapWidget):
    pass


class MultiPolygonWidget(forms.gis.MultiPolygonWidget, forms.gis.BaseGMapWidget):
    pass
