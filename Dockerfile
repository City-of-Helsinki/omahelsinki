FROM python:3.6
LABEL maintainer="hello@wagtail.io"

ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev

RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

COPY ./requirements.txt /code/requirements.txt
RUN pip install -r /code/requirements.txt
RUN pip install gunicorn

COPY . /code/
WORKDIR /code/

RUN yarn install

RUN yes | python manage.py migrate

RUN useradd wagtail
RUN chown -R wagtail /code
USER wagtail

EXPOSE 8000
CMD exec gunicorn omahelsinki.wsgi:application --bind 0.0.0.0:8000 --workers 3
