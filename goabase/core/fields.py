from django.db.models.fields import SlugField

from goabase.core.utils import (slugify, get_prepopulated_value, crop_slug,
                                generate_unique_slug)

SLUG_INDEX_SEPARATOR = '-'


class AutoSlugField(SlugField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = kwargs.get('max_length', 50)

        # Auto-populated slug is not editable unless told so.
        self.populate_from = kwargs.pop('populate_from', None)
        if self.populate_from:
            kwargs.setdefault('editable', False)

        self.unique_with = kwargs.pop('unique_with', ())
        if isinstance(self.unique_with, str):
            self.unique_with = (self.unique_with,)

        self.slugify = kwargs.pop('slugify', slugify)
        assert hasattr(self.slugify, '__call__')

        self.index_sep = kwargs.pop('sep', SLUG_INDEX_SEPARATOR)

        if self.unique_with:
            # We will do "manual" granular check below.
            kwargs['unique'] = False

        # Set db_index=True unless it's been set manually.
        if 'db_index' not in kwargs:
            kwargs['db_index'] = True

        # A boolean instructing the field to accept Unicode letters in addition
        # to ASCII letters. Defaults to False.
        self.allow_unicode = kwargs.pop('allow_unicode', False)

        # When using model inheritence, set manager to search for matching slug
        # values.
        self.manager = kwargs.pop('manager', None)
        self.manager_name = kwargs.pop('manager_name', None)

        self.always_update = kwargs.pop('always_update', False)
        super(SlugField, self).__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super(AutoSlugField, self).deconstruct()

        if self.max_length == 50:
            kwargs.pop('max_length', None)

        if self.populate_from is not None:
            kwargs['populate_from'] = self.populate_from
            if self.editable is not False:
                kwargs['editable'] = self.editable

        if self.unique_with != ():
            kwargs['unique_with'] = self.unique_with
            kwargs.pop('unique', None)

        if self.slugify != slugify:
            kwargs['slugify'] = self.slugify

        if self.index_sep != SLUG_INDEX_SEPARATOR:
            kwargs['sep'] = self.index_sep

        kwargs.pop('db_index', None)

        if self.manager is not None:
            kwargs['manager'] = self.manager

        if self.manager_name is not None:
            kwargs['manager_name'] = self.manager_name

        if self.always_update:
            kwargs['always_update'] = self.always_update

        if 'manager' in kwargs:
            del kwargs['manager']

        return name, path, args, kwargs

    def pre_save(self, instance, add):
        # Get currently entered slug.
        value = self.value_from_object(instance)

        if self.manager is not None:
            manager = self.manager
        elif self.manager_name is not None:
            manager = getattr(self.model, self.manager_name)
        else:
            manager = None

        if self.always_update or (self.populate_from and not value):
            value = get_prepopulated_value(self, instance)

            if __debug__ and not value and not self.blank:
                print('Failed to populate slug %s.%s from %s'
                      % (instance._meta.object_name, self.name,
                         self.populate_from))

        if value:
            slug = self.slugify(value)
        else:
            slug = None

            if not self.blank:
                slug = instance._meta.model_name
            elif not self.null:
                slug = ''

        if not self.blank:
            assert slug, 'slug is defined before trying to ensure uniqueness'

        if slug:
            slug = crop_slug(self, slug)

            # Ensure the slug is unique (if required).
            if self.unique or self.unique_with:
                slug = generate_unique_slug(self, instance, slug, manager)

            assert slug, 'value is filled before saving'

        # Make the updated slug available as instance attribute.
        setattr(instance, self.name, slug)

        return slug
