from modeltranslation.decorators import register
from modeltranslation.translator import TranslationOptions

from .models import AboutPage, HelpPage, HomePage, PageFAQ, ServicePage


@register(HomePage)
class HomePageTR(TranslationOptions):
    fields = ("call_to_action", "hero")


@register(HelpPage)
class HelpPageTR(TranslationOptions):
    fields = ("hero_text",)


@register(PageFAQ)
class PageFAQListTR(TranslationOptions):
    fields = ("question", "answer")


@register(ServicePage)
class ServiceTR(TranslationOptions):
    fields = ("hero_text",)


@register(AboutPage)
class AboutTR(TranslationOptions):
    fields = ("hero_text", "body")
