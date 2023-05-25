from django.db import models

class Notification(models.Model):
    total_unread_messages = models.IntegerField(default=0)
