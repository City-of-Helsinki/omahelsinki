from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.search import index


class Hero(Page):
    heroHeading = models.CharField(max_length=100, blank=True)
    heroBody = RichTextField(blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('heroHeading'),
        index.SearchField('heroBody'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('heroHeading'),
        FieldPanel('heroBody', classname="full"),
    ]
