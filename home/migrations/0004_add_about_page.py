# Generated by Django 2.0.8 on 2018-11-29 08:48

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0040_page_draft_title'),
        ('home', '0003_add_page_models'),
    ]

    operations = [
        migrations.CreateModel(
            name='AboutPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('hero_text', models.TextField(blank=True)),
                ('hero_text_fi', models.TextField(blank=True, null=True)),
                ('hero_text_sv', models.TextField(blank=True, null=True)),
                ('hero_text_en', models.TextField(blank=True, null=True)),
                ('body', wagtail.core.fields.RichTextField(blank=True)),
                ('body_fi', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('body_sv', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('body_en', wagtail.core.fields.RichTextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
    ]