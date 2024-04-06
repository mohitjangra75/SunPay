# Generated by Django 4.2.11 on 2024-04-06 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "itpub_models",
            "0016_rename_acc_holdername_companybank_account_holdername_and_more",
        ),
    ]

    operations = [
        migrations.CreateModel(
            name="BBPSProviders",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("provider_id", models.IntegerField(blank=True, null=True)),
                (
                    "provider_name",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("type", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "Fields_Description",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
            ],
        ),
        migrations.AddField(
            model_name="state",
            name="adddate",
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="state",
            name="country_id",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="state",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="state",
            name="state_code",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
