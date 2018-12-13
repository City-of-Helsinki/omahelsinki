from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import include, path, re_path
from django.utils.translation import ugettext_lazy as _
from django.views.generic import TemplateView
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views

urlpatterns = [
    path('django-admin/', admin.site.urls),

    path('admin/', include(wagtailadmin_urls)),
    path('i18n/', include('django.conf.urls.i18n')),
    path('documents/', include(wagtaildocs_urls)),

    path('search/', search_views.search, name='search'),

    path('', include('social_django.urls', namespace='social')),
    path('', include('helusers.urls')),
]

urlpatterns += i18n_patterns(
    path(_('my-data/'), TemplateView.as_view(template_name='react_base.html'), name='my-data'),
    path(_('my-data/profile/'), TemplateView.as_view(template_name='react_base.html'), name='my-data-profile'),
    path(_('my-data/interests/'), TemplateView.as_view(template_name='react_base.html'), name='my-data-interests'),
    path(_('my-data/services/'), TemplateView.as_view(template_name='react_base.html'), name='my-data-services'),
    path(_('my-data/history/'), TemplateView.as_view(template_name='react_base.html'), name='my-data-history'),

    path('welcome/', TemplateView.as_view(template_name='react_base.html'), name='welcome'),
    re_path(r'^app/', TemplateView.as_view(template_name='react_base.html'), name='app'),

    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path('', include(wagtail_urls)),
)


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
