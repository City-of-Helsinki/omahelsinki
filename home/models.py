from django.db import models
from django.utils.translation import ugettext_lazy as _
from modelcluster.fields import ParentalKey
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, StreamFieldPanel
from wagtail.core import blocks
from wagtail.core.fields import RichTextField, StreamField
from wagtail.core.models import Orderable, Page
from wagtail.images.edit_handlers import ImageChooserPanel


class FAQ(models.Model):
    question = models.CharField(max_length=150)
    answer = RichTextField()

    panels = [FieldPanel("question"), FieldPanel("answer")]

    class Meta:
        abstract = True


class PageFAQ(Orderable, FAQ):
    page = ParentalKey("home.HelpPage", on_delete=models.CASCADE, related_name="faqs")


class HomePage(Page):
    call_to_action = models.TextField(null=True, blank=True)
    background_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    hero = StreamField(
        [("heading", blocks.CharBlock()), ("paragraph", blocks.RichTextBlock())],
        null=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel("call_to_action"),
        ImageChooserPanel("background_image"),
        StreamFieldPanel("hero"),
    ]


class HelpPage(Page):
    hero_text = models.TextField(null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("hero_text"),
        InlinePanel("faqs", label=_("FAQs")),
    ]


class ServicePage(Page):
    hero_text = models.TextField(null=True, blank=True)

    content_panels = Page.content_panels + [FieldPanel("hero_text")]


class AboutPage(Page):
    hero_text = models.TextField(blank=True)
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [FieldPanel("hero_text"), FieldPanel("body")]
