# Generated by Django 4.1.4 on 2023-01-27 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_portfolio_organization_portfolio_staff'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='portfolio',
            name='staff',
        ),
        migrations.AddField(
            model_name='portfolio',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]
