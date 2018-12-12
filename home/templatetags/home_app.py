import json

from django.conf import settings
from django.template import Library
from django.urls import NoReverseMatch, resolve, reverse
from django.utils.translation import override

register = Library()

LANGUAGE_CODES = [lang[0] for lang in settings.LANGUAGES]


@register.simple_tag(takes_context=True)
def get_translated_urls_json(context, page):
    """
    Return the current page's (React or Wagtail) all translated urls

    Returns JSON with language codes as keys, for example: {"fi": "/fi/apua/", "en": "/en/help/" ... }
    """
    urls = {
        lang: _get_translated_url(context['request'], lang, page)
        for lang in LANGUAGE_CODES
    }
    return json.dumps(urls)


def _get_translated_url(request, lang, page):
    root = '/{}'.format(lang)  # we should never need to use this fallback but better safe than sorry
    return _get_react_page_url(request, lang) or _get_wagtail_page_url(request, lang, page) or root


def _get_react_page_url(request, lang):
    path = request.path
    url_parts = resolve(path)

    with override(lang):
        try:
            return reverse(url_parts.view_name, kwargs=url_parts.kwargs)
        except NoReverseMatch:
            return None


def _get_wagtail_page_url(request, lang, page):
    with override(lang):
        return page.get_url(request)
