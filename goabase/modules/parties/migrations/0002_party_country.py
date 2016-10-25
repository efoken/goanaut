# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-09 20:49
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('countries', '0001_initial'),
        ('parties', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='country',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='countries.Country', verbose_name='country'),
            preserve_default=False,
        ),
    ]