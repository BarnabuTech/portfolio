from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email_address", "message", "created_at")  
    search_fields = ("full_name", "email_address", "message")  
    list_filter = ("created_at",)  

    # Make message field readable in the list view
    def message(self, obj):
        return obj.message[:50] + "..." if len(obj.message) > 50 else obj.message  # Truncate long messages

