from django import template

register = template.Library()

@register.simple_tag
def swagger_static(url):
    return f"swagger/{url}"
