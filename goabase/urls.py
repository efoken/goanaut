from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views import defaults as default_views
from django.views.generic.base import TemplateView

from goabase.modules.parties.views import PartyListView

urlpatterns = [
    url(r'^$', PartyListView.as_view(template_name='index.html', paginate_by=40), name='index'),

    # Django Admin, use {% url 'admin:index' %}
    url(r'^admin/', admin.site.urls),

    # User management
    url(r'^users/', include('goabase.modules.users.urls', namespace='users')),
    url(r'^accounts/', include('allauth.urls')),

    url(r'^parties/', include('goabase.modules.parties.urls', namespace='parties')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += [
        url(r'^400/$', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        url(r'^403/$', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        url(r'^404/$', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        url(r'^500/$', default_views.server_error),
    ]
