# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-24 20:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20180324_2044'),
    ]

    operations = [
        migrations.AddField(
            model_name='action',
            name='debug_balance',
            field=models.IntegerField(default=0, help_text='Balance after action'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='action',
            name='delta',
            field=models.IntegerField(default=1, help_text='Balance delta.'),
            preserve_default=False,
        ),
    ]
