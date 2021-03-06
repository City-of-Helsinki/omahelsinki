# Oma.helsinki

:fire: Wagtail CMS + ReactJS :fire:

Oma.helsinki is a MyData-based user account for city services. It provides user-driven data handling and consent management for City of Helsinki services.

## Installation

### General prerequisites

For any type of local development setup the following is recommended:

1. Create local settings: `touch local_settings.py`

2. Set `DEBUG = True`

3. In order to use some [Tunnistamo](https://github.com/City-of-Helsinki/tunnistamo)
   instance to handle user logins, set proper url and keys in `local_settings.py`:

```python
TUNNISTAMO_BASE_URL = 'http://some.url'

SOCIAL_AUTH_TUNNISTAMO_KEY = 'some key'
SOCIAL_AUTH_TUNNISTAMO_SECRET = 'some secret'
SOCIAL_AUTH_TUNNISTAMO_OIDC_ENDPOINT = TUNNISTAMO_BASE_URL + '/openid'
```

Get these from someone involved in the project.

The project will also work without them, but the only way to login
would be through Wagtail admin interface.

### Development with Docker

1. Start docker containers: `docker-compose up`

2. When you run your containers for the first time, apply Django migrations:

- `docker exec -it omahelsinki python manage.py migrate`
- answer yes to all questions

Now your project is live at [localhost:8000](http://localhost:8000)

You can load some dummy data for wagtail if you want:

```bash
curl "https://omahelsinki.test.hel.ninja/media/omahelsinki-datadump.json" > omahelsinki-datadump.json
docker exec omahelsinki python manage.py loaddata omahelsinki-datadump.json
```

To log into django container do `docker exec -it omahelsinki bash`

There is a compiler container for the react app, so any changes to
react JS files will get built automatically and cause the current Django
page to reload.

### Development w/o Docker

#### Requirements:

- PostgreSQL
- Python >3
- Virtualenv
- gettext (to compile translations)

#### Setting up

- Create Virtualenv env: `virtualenv -p python3 django`
- Navigate to env directory, activate env: `cd django && source bin/activate`
- Clone omahelsinki to env dir: `git clone https://github.com/City-of-Helsinki/omahelsinki.git`
- Go inside oma dir `cd omahelsinki`
- Install dependencies `pip install -r requirements.txt`
- Install dev-dependencies `pip install -r requirements-dev.txt`

#### Bundling/Compile JS assets:

```bash
yarn install
yarn build
```

#### Initialize Database (if doesnt exist)

- Check if db service is running
- Create database

#### Serve build

```
python manage.py migrate
python manage.py compilemessages
python manage.py createsuperuser
python manage.py runserver
```

Now your project is live at [localhost:8000](http://localhost:8000)

#### Load test content

You can load some test content for the Wagtail part:

```bash
curl "https://omahelsinki.test.hel.ninja/media/omahelsinki-datadump.json" > omahelsinki-datadump.json
python manage.py loaddata omahelsinki-datadump.json
```

## Authentication

In order to log in into the profile through Omahelsinki UI you either:

a). Have proper keys to test instance of Tunnisamo mentioned in part 3 of 
[general prerequisites](#general-prerequisites)

or

b). Have set up your own local instances of:

- [Tunnistamo](https://github.com/City-of-Helsinki/tunnistamo)
- [Open-city-profile](https://github.com/City-of-Helsinki/open-city-profile)
- [this Omahelsinki UI](https://github.com/City-of-Helsinki/omahelsinki)

If you are running all of these services locally through Docker, you need
to make sure that they can communicate with each other. Here is a guide that will
help you to set them up properly:

- [How to connect Tunnistamo, Profile and Omahelsinki running on Docker](docs/connecting-docker-containers.md)

If you are not using Docker (you run all of the projects directly on your machine with
some virtual environment for python dependencies), you can skip this part.

Here is a guide that will help you configure all of the clients, scopes and APIs in
you local Tunnistamo:

- [How to configure clients, scopes and APIs for Omahelsinki](docs/configuring-local-tunnistamo.md)


## Prettier / eslint

It's recommended to have format on save in your editor to automatically comply with prettier/eslint rules.
For example with VSCode you should have the following in your Workspace Settings:

```
{
    "editor.formatOnSave": true
}
```

You can also manually prettify everything with (from project root folder)

```bash
yarn prettier  "assets/**/*.js" --write
```

Also to verify everything is OK, use

```bash
yarn lint
```

## Views

- Landing page: [localhost:8000](http://localhost:8000)
- Wagtail admin: [/admin](http://localhost:8000/admin)
- Profile React UI: [/mydata](http://localhost:8000/mydata)
- Onboarding: [/welcome](http://localhost:8000/welcome)

## License

This project is licensed under the [MIT License](https://github.com/City-of-Helsinki/omahelsinki/blob/master/LICENSE)
