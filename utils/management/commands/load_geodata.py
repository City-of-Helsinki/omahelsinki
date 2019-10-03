import os

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Download and load a ready-made datadump"

    def handle(self, *args, **kwargs):
        self.import_hoods_geo()
        self.import_sea_geo()

    def import_hoods_geo(self):
        download_command = 'curl "https://geoserver.hel.fi/geoserver/hel/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=hel:kaupunginosa&maxFeatures=1000000&outputFormat=application%2Fjson&srsName=EPSG%3A4326" > /tmp/helsinki_hoods-geo.json'
        mapshaper_command = "mapshaper tmp/helsinki_hoods-geo.json -simplify 10% -o format=topojson /code/assets/js/data/helsinki-hoods-topo.json"
        os.system(download_command)
        os.system(mapshaper_command)

    def import_sea_geo(self):
        download_command = 'curl "https://geoserver.hel.fi/geoserver/seutukartta/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=seutukartta:Vakavesi_meri&maxFeatures=1000000&outputFormat=application%2Fjson&srsName=EPSG%3A4326" > /code/tmp/helsinki-sea-geo.json'
        mapshaper_command = "mapshaper tmp/helsinki-sea-geo.json -simplify 10% -o format=topojson /code/assets/js/data/helsinki-sea-topo.json"
        os.system(download_command)
        os.system(mapshaper_command)
