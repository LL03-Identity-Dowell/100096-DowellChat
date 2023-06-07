# Generated by Django 4.1.5 on 2023-01-31 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("customer_support", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="room",
            old_name="organization",
            new_name="company",
        ),
        migrations.RemoveField(
            model_name="room",
            name="authority_portfolio",
        ),
        migrations.AddField(
            model_name="room",
            name="authority_portfolio",
            field=models.ManyToManyField(to="customer_support.portfolio"),
        ),
    ]