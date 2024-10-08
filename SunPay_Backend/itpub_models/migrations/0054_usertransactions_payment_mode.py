# Generated by Django 5.0.6 on 2024-06-02 12:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0053_alter_usertransactions_adddate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertransactions',
            name='payment_mode',
            field=models.CharField(choices=[(8, 'IMPS_RTGS_NEFT'), (4, 'CASH'), (5, 'UPI'), (9, 'CHEQUE_DD')], default=datetime.datetime(2024, 6, 2, 12, 9, 14, 800085, tzinfo=datetime.timezone.utc), max_length=50),
            preserve_default=False,
        ),
    ]
