FROM python:3.6

ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev

RUN apt-get update \
    && apt-get install --no-install-recommends -y gettext

RUN apt-get install --yes curl \
    && curl --silent --location https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install --yes nodejs \
    && apt-get install --yes build-essential

COPY ./requirements.txt /code/requirements.txt
RUN pip install -r /code/requirements.txt \
    && pip install gunicorn \
    && pip install pip-tools

COPY . /code/
WORKDIR /code/

RUN python manage.py compilemessages

RUN useradd wagtail
RUN chown -R wagtail /code
USER wagtail
