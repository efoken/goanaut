from django import template
from django.utils.safestring import mark_safe

from goabase.core.models import ReactRenderer

register = template.Library()

renderer = ReactRenderer({
    'url': 'http://localhost:8001/batch',
})


def to_camel_case(prop_name):
    components = prop_name.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


@register.simple_tag
def render_react_component(component, **kwargs):
    props = dict([(to_camel_case(k), v) for k, v in kwargs.items()])
    html = renderer.render({component: props})
    return mark_safe(html)
