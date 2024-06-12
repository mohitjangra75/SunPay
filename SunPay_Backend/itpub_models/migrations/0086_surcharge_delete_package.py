# Generated by Django 5.0.6 on 2024-06-11 05:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0085_user_is_staff'),
    ]

    operations = [
        migrations.CreateModel(
            name='Surcharge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('s101to2000', models.FloatField(blank=True, null=True)),
                ('s2001to5000', models.FloatField(blank=True, null=True)),
                ('s5001to10000', models.FloatField(blank=True, null=True)),
                ('s10001to50000', models.FloatField(blank=True, null=True)),
                ('s50001to100000', models.FloatField(blank=True, null=True)),
                ('s100001to500000', models.FloatField(blank=True, null=True)),
                ('s500001toall', models.FloatField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Package',
        ),
    ]
