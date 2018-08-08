from django.db import models
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.search import index


class Services(Page):
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )
    caption_head = models.CharField(blank=True, max_length=100)
    caption = models.CharField(blank=True, max_length=250)
    service_link = models.CharField(blank=True, max_length=250)

    search_fields = Page.search_fields + [
        index.SearchField('caption_head'),
        index.SearchField('caption'),
    ]

    content_panels = Page.content_panels + [
        ImageChooserPanel('image'),
        FieldPanel('caption_head'),
        FieldPanel('caption'),
        FieldPanel('service_link'),
    ]
