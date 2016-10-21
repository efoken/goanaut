from django.contrib.staticfiles.finders import find
from django.utils import timezone
from django.views.generic import DetailView, ListView
from react.render import render_component

from goabase.modules.parties.models import Party


class PartyDetailView(DetailView):
    model = Party

    def get_context_data(self, **kwargs):
        context = super(PartyDetailView, self).get_context_data(**kwargs)

        td = self.object.start_date - timezone.now()

        context['react_countdown'] = render_component(
            find('scripts/components/CountdownTimer.jsx', all=True)[0],
            {'initialTimeRemaining': int(td.total_seconds() * 1000)}
        )
        context['react_countdown_milliseconds'] = int(td.total_seconds() * 1000)

        return context


class PartyListView(ListView):
    def get_queryset(self):
        return Party.objects.filter(
            start_date__gte=timezone.now()).order_by('-start_date')
