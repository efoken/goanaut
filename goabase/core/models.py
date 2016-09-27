import pycountry

from django.db.models.fields import CharField

from goabase.core.forms import CountryField as CountryFormField


class CountryField(CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 2
        kwargs['choices'] = pycountry.countries
        super(CountryField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        kwargs.setdefault('widget', CountryFormField)
        return super(CountryField, self).formfield(**kwargs)
