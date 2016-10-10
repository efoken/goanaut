from django.views.generic import DetailView, ListView

from goabase.modules.parties.models import Party


class PartyDetailView(DetailView):
    model = Party


class PartyListView(ListView):
    model = Party
