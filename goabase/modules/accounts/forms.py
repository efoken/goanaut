from allauth.account.forms import LoginForm as BaseLoginForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field, ButtonHolder, Submit
from django.utils.translation import ugettext_lazy as _

class LoginForm(BaseLoginForm):
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_show_labels = False
        self.helper.layout = Layout(
            Field('login', css_class='form-control-lg', placeholder=_('Username')),
            Field('password', css_class='form-control-lg', placeholder=_('Password')),
        )
