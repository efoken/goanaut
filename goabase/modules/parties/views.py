from django.utils import timezone
from django.views.generic import DetailView, ListView

from goabase.modules.parties.models import Party


class PartyDetailView(DetailView):
    model = Party

    def get_context_data(self, **kwargs):
        context = super(PartyDetailView, self).get_context_data(**kwargs)
        td = self.object.start_date - timezone.now()
        context['countdown_seconds'] = td.seconds % 60
        context['countdown_minutes'] = int((td.seconds / 60) % 60)
        context['countdown_hours'] = int((td.seconds / 60 * 60) % 24)
        context['countdown_days'] = td.days
        return context


class PartyListView(ListView):
    def get_queryset(self):
        return Party.objects.filter(
            start_date__gte=timezone.now()).order_by('-start_date')
