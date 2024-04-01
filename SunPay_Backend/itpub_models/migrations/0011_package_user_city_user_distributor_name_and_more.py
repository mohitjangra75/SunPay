# Generated by Django 4.2.11 on 2024-04-01 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("itpub_models", "0010_bank_companybank_companydetails_fundrequest_state"),
    ]

    operations = [
        migrations.CreateModel(
            name="Package",
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
                ("ISACTIVE", models.BooleanField(default=True)),
                ("pack_id", models.IntegerField(blank=True)),
                ("pack_name", models.CharField(blank=True, max_length=255)),
                ("start_value", models.IntegerField(blank=True)),
                ("surcharge", models.FloatField(blank=True)),
                ("end_value", models.IntegerField(blank=True)),
                ("is_flat", models.BooleanField(blank=True)),
                ("payment_type", models.CharField(max_length=256)),
                ("is_distributor", models.BooleanField(default=True)),
                ("is_company", models.BooleanField(default=True)),
                ("company_back", models.FloatField(blank=True)),
                ("distributor_back", models.IntegerField(blank=True)),
                ("tds", models.FloatField(blank=True)),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="city",
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="distributor_name",
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="is_distributor",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="user",
            name="shop_adress",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="bankdetails",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="customer",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
    ]
