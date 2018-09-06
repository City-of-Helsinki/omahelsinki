from __future__ import absolute_import

from django.apps import AppConfig


class HomeConfig(AppConfig):
    name = 'home'
    verbose_name = 'Home'

    def ready(self):
        from .models import PageFAQ
        from wagtail_modeltranslation.patch_wagtailadmin import WagtailTranslator

        WagtailTranslator(PageFAQ)
