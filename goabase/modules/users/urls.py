from django.conf.urls import url

from goabase.modules.users.views import (UserListView, UserRedirectView,
                                         UserDetailView, UserUpdateView)

urlpatterns = [
    url(r'^$', UserListView.as_view(), name='list'),
    url(r'^~redirect/$', UserRedirectView.as_view(), name='redirect'),
    url(r'^(?P<username>[\w.@+-]+)/$', UserDetailView.as_view(), name='detail'),
    url(r'^~update/$', UserUpdateView.as_view(), name='update'),
]
