# Oma.helsinki

:fire: Wagtail CMS + ReactJS :fire:

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

You should have format on save in your editor to comply with prettier/eslint rules.
For example with VSCode you should have the following in your Workspace Settings:

```
{
    "editor.formatOnSave": true
}
```

You can also manually prettify everything with

```bash
yarn prettier  "assets/**/*.js" --write
```

Also to verify everything is OK, use

```bash
yarn lint
```

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

## Views

- Landing page: [localhost:8000](http://localhost:8000)
- Wagtail admin: [/admin](http://localhost:8000/admin)
- Profile React UI: [/mydata](http://localhost:8000/mydata)
- Onboarding: [/welcome](http://localhost:8000/welcome)
