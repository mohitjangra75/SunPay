# Generated by Django 4.2.11 on 2024-04-06 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("itpub_models", "0017_bbpsproviders_state_adddate_state_country_id_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="state",
            name="update_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
