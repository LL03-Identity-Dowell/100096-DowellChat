# Generated by Django 4.1.5 on 2023-04-07 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "customer_support",
            "0006_portfolio_dowell_logged_in_room_sub_product_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="portfolio",
            name="username",
            field=models.CharField(default="RT", max_length=200),
        ),
    ]