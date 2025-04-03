from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ContactMessage

@csrf_exempt
def submit_contact_form(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            full_name = data.get("full_name")
            email_address = data.get("email_address")
            message = data.get("message")

            if not (full_name and email_address and message):
                return JsonResponse({"error": "All fields are required"}, status=400)

            ContactMessage.objects.create(
                full_name=full_name,
                email_address=email_address,
                message=message
            )

            return JsonResponse({"message": "Message received successfully!"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


