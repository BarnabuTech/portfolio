from django.db import models

class ContactMessage(models.Model):
    full_name = models.CharField(max_length=255)
    email_address = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
