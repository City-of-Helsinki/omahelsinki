from django.conf import settings

def js_settings(request):
    return {'PROFILE_API_URL': settings.PROFILE_API_URL}
