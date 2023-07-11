from django.db import models

from django.contrib.auth.models import AbstractUser
import uuid
from django.db.models.functions import Lower

class User(AbstractUser):
    handle = models.CharField(max_length=255)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(Lower('handle'), name='unique_handle')
        ]
        
class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    text = models.CharField(max_length=280)
    date = models.DateTimeField(auto_now_add=True)

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Login(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Signup(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class TestToken(models.Model):
    token = models.CharField(max_length=500)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.token