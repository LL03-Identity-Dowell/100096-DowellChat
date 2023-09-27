# Generated by Django 4.1 on 2023-09-26 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('room_id', models.CharField(max_length=50)),
                ('message_data', models.TextField()),
                ('side', models.CharField(max_length=50)),
                ('author', models.CharField(max_length=250)),
                ('message_type', models.CharField(max_length=50)),
            ],
        ),
    ]
