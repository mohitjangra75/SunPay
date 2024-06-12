# Generated by Django 5.0.6 on 2024-06-05 05:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0069_dmttransactions_bene_name_dmttransactions_mobile'),
    ]

    operations = [
        migrations.CreateModel(
            name='WallettoWallet_transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_direction', models.SmallIntegerField(choices=[(1, 'DEBIT'), (2, 'CREDIT')], db_index=True, null=True)),
                ('ref_id', models.CharField(blank=True, max_length=255, null=True)),
                ('receiver', models.CharField(blank=True, max_length=255, null=True)),
                ('transaction_status', models.SmallIntegerField(choices=[(3, 'PENDING'), (2, 'FAILURE'), (1, 'SUCCESS')], db_index=True)),
                ('amount', models.FloatField()),
                ('transaction_type', models.SmallIntegerField(choices=[(2, 'WALLET')], db_index=True)),
                ('add_date', models.DateTimeField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
