from django.conf import settings as _settings

def settings(request):
    return {'PROFILE_API_URL': _settings.PROFILE_API_URL}
