from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.search import index


class HomePage(Page):
    heading = models.CharField(max_length=100, blank=True)
    body = RichTextField(blank=True)
    login_link = models.CharField(max_length=500, blank=True)
    login_text = models.CharField(max_length=500, blank=True)
    register_link = models.CharField(max_length=500, blank=True)
    register_text = models.CharField(max_length=500, blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('heading'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('heading'),
        FieldPanel('body', classname="full"),
        FieldPanel('login_link'),
        FieldPanel('login_text'),
        FieldPanel('register_link'),
        FieldPanel('register_text'),
    ]
