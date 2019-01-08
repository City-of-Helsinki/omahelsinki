#!/bin/bash

curl "https://geoserver.hel.fi/geoserver/hel/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=hel:kaupunginosa&maxFeatures=1000000&outputFormat=application%2Fjson&srsName=EPSG%3A4326" > /code/tmp/helsinki_hoods-geo.json

mapshaper tmp/helsinki_hoods-geo.json -simplify 10% -o format=topojson /code/assets/js/data/helsinki-hoods-topo.json

curl "https://geoserver.hel.fi/geoserver/seutukartta/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=seutukartta:Vakavesi_meri&maxFeatures=1000000&outputFormat=application%2Fjson&srsName=EPSG%3A4326" > /code/tmp/helsinki-sea-geo.json

mapshaper tmp/helsinki-sea-geo.json -simplify 10% -o format=topojson /code/assets/js/data/helsinki-sea-topo.json

bash -c "yarn && gunicorn omahelsinki.wsgi:application --reload --access-logfile - --bind 0.0.0.0:8000 --workers 3"