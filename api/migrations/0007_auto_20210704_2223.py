# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2021-07-04 20:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210704_2204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='user_friendly_id',
            field=models.UUIDField(blank=True, editable=False, unique=True),
        ),
    ]