from django.contrib.gis.db import models
from django.utils.translation import ugettext_lazy as _
from scrapy_djangoitem import DjangoItem

from goabase.core.utils import slugify
from goabase.modules.countries.models import Country


class Source(models.Model):
    name = models.CharField(_('name'), max_length=50)

    class Meta:
        verbose_name = _('source')
        verbose_name_plural = _('sources')


class Party(models.Model):
    name = models.CharField(_('name'), max_length=100)
    start_date = models.DateTimeField(_('start date'))
    end_date = models.DateTimeField(_('end date'))

    TYPE_CHOICES = (
        ('festival', _('Festival')),
        ('openair', _('Open Air')),
        ('indoor', _('Indoor')),
        ('club', _('Club')),
        ('indoor_outdoor', _('In- & Outdoor')),
    )
    type = models.CharField(_('type'), max_length=14, choices=TYPE_CHOICES,
                            default='indoor')

    town = models.CharField(_('town'), max_length=100)
    country = models.ForeignKey(Country, verbose_name=_('country'))
    location = models.PointField(_('location'))
    lineup = models.TextField(_('lineup'))
    decoration = models.TextField(_('decoration'))
    entry_fee = models.TextField(_('entry fee'))
    more = models.TextField(_('more'))
    organizer_name = models.CharField(_('organizer name'), max_length=255)
    organizer_text = models.TextField(_('organizer text'))
    organizer_url = models.TextField(_('organizer URL'))
    image = models.ImageField(_('image'), upload_to='uploads/%Y/%m/%d/',
                              null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    STATUS_CHOICES = (
        ('scheduled', _('Scheduled')),
        ('cancelled', _('Cancelled')),
        ('postponed', _('Postponed')),
        ('moved', _('Moved')),
    )
    status = models.CharField(_('status'), max_length=9, choices=STATUS_CHOICES,
                              default='scheduled')

    objects = models.GeoManager()

    class Meta:
        verbose_name = _('party')
        verbose_name_plural = _('parties')

    def __str__(self):
        return self.name

    @property
    def slug(self):
        return slugify(self.name)

    def is_multiday(self):
        td = self.end_date - self.start_date
        return td.days >= 1


class PartyItem(DjangoItem):
    django_model = Party
