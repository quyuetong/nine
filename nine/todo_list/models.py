from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Task(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, blank=True)
    expire_date = models.DateField(blank=True)
    priority = models.IntegerField()
    state = models.BooleanField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
