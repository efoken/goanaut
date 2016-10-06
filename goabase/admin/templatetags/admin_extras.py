import feedparser

from django import template

register = template.Library()


@register.simple_tag
def get_admin_feed(limit, url):
    if url is None:
        url = 'http://www.djangoproject.com/rss/weblog/'
    feed = feedparser.parse(url)
    if limit is not None:
        entries = feed['entries'][:int(limit)]
    else:
        entries = feed['entries']
    return entries
