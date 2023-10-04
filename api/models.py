from django.db import models

# Create your models here.

class Message(models.Model):
    type = models.CharField(max_length=50)
    room_id = models.CharField(max_length=50)
    message_data = models.TextField()
    side = models.CharField(max_length=50)
    author = models.CharField(max_length=250)
    message_type = models.CharField(max_length=50)

    def __str__(self):
        return self.room_id