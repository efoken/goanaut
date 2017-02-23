from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, ListView, RedirectView, UpdateView

from goabase.modules.users.models import User


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    slug_field = 'username'
    slug_url_kwarg = 'username'


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse('users:detail', kwargs={'username': self.request.user.username})


class UserUpdateView(LoginRequiredMixin, UpdateView):
    fields = ['first_name', 'middle_name', 'last_name']
    model = User

    def get_success_url(self):
        # Send the user back to their own page after a successful update
        return reverse('users:detail', kwargs={'username': self.request.user.username})

    def get_object(self):
        # Only get the User record for the user making the request
        return User.objects.get(username=self.request.user.username)


class UserListView(LoginRequiredMixin, ListView):
    model = User
    slug_field = 'username'
    slug_url_kwarg = 'username'
