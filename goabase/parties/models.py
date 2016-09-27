from django.contrib.gis.db import models
from django.utils.translation import ugettext_lazy as _


class Party(models.Model):
    name = models.CharField(_('name'), max_length=100)
    start_date = models.DateTimeField(_('start date'))
    end_date = models.DateTimeField(_('end date'))

    TYPE_CHOICES = (
        ('festival', _('Festival')),
        ('openair', _('Open air')),
        ('indoor', _('Indoor')),
        ('club', _('Club')),
        ('indoor_outdoor', _('In- and outdoor')),
    )
    type = models.CharField(_('type'), max_length=14, default='indoor')

    town = models.CharField(_('town'), max_length=100)
    location = models.PointField(_('location'))
    lineup = models.TextField(_('lineup'))
    decoration = models.TextField(_('decoration'))
    entry_fee = models.TextField(_('entry fee'))
    more = models.TextField(_('more'))
    organizer_name = models.CharField(_('organizer name'), max_length=255)
    organizer_text = models.TextField(_('organizer text'))
    organizer_url = models.TextField(_('organizer URL'))
    image = models.ImageField(_('image'), upload_to='uploads/%Y/%m/%d/')
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

    class Meta:
        verbose_name = _('party')
        verbose_name_plural = _('parties')

    def __str__(self):
        return self.name
