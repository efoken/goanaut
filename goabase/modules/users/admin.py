from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import ugettext_lazy as _

from goabase.modules.users.models import User


class MyUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User


class MyUserCreationForm(UserCreationForm):
    error_message = UserCreationForm.error_messages.update({
        'duplicate_username': _('This username has already been taken.')
    })

    class Meta(UserCreationForm.Meta):
        model = User

    def clean_username(self):
        username = self.cleaned_data['username']
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(self.error_messages['duplicate_username'])


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    form = MyUserChangeForm
    add_form = MyUserCreationForm
    search_fields = ('username', 'first_name', 'middle_name', 'last_name', 'email')

    def get_fieldsets(self, request, obj=None):
        fieldsets = super(UserAdmin, self).get_fieldsets(request, obj)
        if obj is not None:
            fieldsets[1][1]['fields'] = ('first_name', 'middle_name', 'last_name', 'email')
        return fieldsets
