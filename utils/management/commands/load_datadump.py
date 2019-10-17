import os

from django.core.management.base import BaseCommand
from django.core.management import call_command
from wagtail.core.models import Site


class Command(BaseCommand):
    help = "Download and load a ready-made datadump"

    def handle(self, *args, **kwargs):
        if Site.objects.count():
            print("Can not load data since database already has been populated")
            return False

        download_command = 'curl "https://omahelsinki.test.hel.ninja/media/omahelsinki-datadump.json" > /tmp/omahelsinki-datadump.json'
        os.system(download_command)

        call_command("loaddata", "/tmp/omahelsinki-datadump.json")
        return True
