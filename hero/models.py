from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.search import index


class Hero(Page):
    hero_heading = models.CharField(max_length=100, blank=True)
    hero_body = RichTextField(blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('hero_heading'),
        index.SearchField('hero_body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('hero_heading'),
        FieldPanel('hero_body', classname="full"),
    ]
