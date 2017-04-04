from django.contrib.staticfiles.finders import find
from django.http.response import HttpResponsePermanentRedirect
from django.urls import reverse
from django.utils import timezone
from django.views.generic import DetailView, ListView

from goabase.modules.parties.models import Party


class PartyDetailView(DetailView):
    model = Party

    def get(self, request, *args, **kwargs):
        self.object = obj = self.get_object()
        correct_url = reverse('parties:detail', args=[obj.slug, obj.pk])
        if request.path != correct_url:
            return HttpResponsePermanentRedirect(correct_url)

        context = self.get_context_data(object=obj)
        return self.render_to_response(context)

    def get_context_data(self, **kwargs):
        context = super(PartyDetailView, self).get_context_data(**kwargs)
        td = self.object.start_date - timezone.now()
        context['react_countdown_milliseconds'] = int(td.total_seconds() * 1000)
        return context


class PartyListView(ListView):
    def get_queryset(self):
        return Party.objects.filter(start_date__gte=timezone.now()).order_by('-start_date')
