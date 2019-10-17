#!/bin/bash

set -e

if [[ -z "$SKIP_DATABASE_CHECK" ]] || [[ "$SKIP_DATABASE_CHECK" = "0" ]]; then
    until nc -z -v -w30 "$DATABASE_HOST" 5432
    do
      echo "Waiting for postgres database connection..."
      sleep 1
    done
    echo "Database is up!"
fi


# Apply database migrations
if [[ "$APPLY_MIGRATIONS" = "1" ]]; then
    echo "Applying database migrations..."
    ./manage.py migrate --noinput
fi

if [[ "$COMPILE_MESSAGE" = "1" ]]; then
    echo "Compiling translation messages..."
    ./manage.py compilemessages
fi

if [[ "$LOAD_DATADUMP" = "1" ]]; then
    echo "Downloading and loading datadump"
    ./manage.py load_datadump
fi

if [[ "$LOAD_GEODATA" = "1" ]]; then
    echo "Downloading and loading geo data"
    ./manage.py load_geodata
fi

if [[ "$CREATE_SUPERUSER" = "1" ]]; then
    ./manage.py add_admin_user -u admin -p admin -e admin@example.com
    echo "Admin user created with credentials admin:admin (email: admin@example.com)"
fi

# Start server
if [[ ! -z "$@" ]]; then
    "$@"
elif [[ "$DEV_SERVER" = "1" ]]; then
    yarn && python ./manage.py runserver 0.0.0.0:8001
else
    uwsgi --ini .prod/uwsgi.ini
fi
