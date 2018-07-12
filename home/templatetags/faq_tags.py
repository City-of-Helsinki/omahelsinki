from django import template
from faq.models import faq

register = template.Library()

# faq snippets


@register.inclusion_tag('home/templates/home/faqs.html', takes_context=True)
def faqs(context):
    return{
      'faqs': faq.objects.all(),
      'request': context['request'],
      }
