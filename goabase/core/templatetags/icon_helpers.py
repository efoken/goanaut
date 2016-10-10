import os
import re

from django import template
from django.contrib.staticfiles import finders
from django.utils.safestring import mark_safe
from xml.dom import minidom

register = template.Library()


class IconDoesNotExist(FileNotFoundError):
    pass


@register.simple_tag
def icon(filename):
    path = finders.find(os.path.join('icons', '%s.svg' % filename), all=True)
    if not path:
        raise IconDoesNotExist('icons/%s.svg' % filename)

    if isinstance(path, (list, tuple)):
        path = path[0]

    doc = minidom.parse(path)
    svg = doc.getElementsByTagName('svg')[0]

    svg.setAttribute('class', 'icon icon-%s' % filename)

    if svg.hasAttribute('xmlns'):
        svg.removeAttribute('xmlns')
    if svg.hasAttribute('xmlns:xlink'):
        svg.removeAttribute('xmlns:xlink')

    return mark_safe(re.sub(r'\s*fill="#.+?"', '', svg.toxml()))
