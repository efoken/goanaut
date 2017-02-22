from django.conf.urls import url

from goabase.modules.parties.views import PartyListView, PartyDetailView

urlpatterns = [
    url(r'^$', PartyListView.as_view(), name='list'),
    url(r'^(?P<slug>[\w-]+)-(?P<pk>\d+)/$', PartyDetailView.as_view(), name='detail'),
]
