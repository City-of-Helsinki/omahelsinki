from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.search import index


class FAQPage(Page):
    faq_title = models.CharField(max_length=100, blank=True)
    faq_subTitle = models.CharField(max_length=100, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('faq_title'),
        FieldPanel('faq_subTitle'),
    ]


class faq(Page):
    faq_question = models.CharField(max_length=280, blank=True)
    faq_answer = RichTextField(blank=True)
    data_target = models.CharField(max_length=280, blank=True)
    aria_controls = models.CharField(max_length=280, blank=True)
    aria_labelledby = models.CharField(max_length=280, blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('faq_question'),
        index.SearchField('faq_answer'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('faq_question'),
        FieldPanel('faq_answer', classname="full"),
        FieldPanel('data_target'),
        FieldPanel('aria_controls'),
        FieldPanel('aria_labelledby'),
    ]
