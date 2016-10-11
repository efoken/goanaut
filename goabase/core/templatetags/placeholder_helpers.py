import os
import random

from django import template
from django.conf import settings
from django.contrib.staticfiles import finders

register = template.Library()


@register.simple_tag
def placeholder_image(path):
    """
    Select a random placeholder image file from the provided directory and
    return its URL. `path` should be relative to STATIC_ROOT.

    Usage: <img src="{% random_image 'images/placeholders/' %}">
    """
    def is_image_file(filename):
        img_types = ['.jpg', '.jpeg', '.png', '.gif']
        ext = os.path.splitext(filename)[1]
        return ext in img_types

    fullpath = finders.find(path, all=False)
    filenames = [f for f in os.listdir(fullpath) if is_image_file(f)]
    pick = random.choice(filenames)

    return os.path.join(settings.STATIC_URL, path, pick)
