import json
import logging

from django.conf import settings
from django.core.mail import BadHeaderError, EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_POST

from .forms import ContactForm

logger = logging.getLogger(__name__)


@require_POST
@csrf_protect
def contact_submit(request):
    logger.info("CONTACT FORM: request received")

    try:
        data = json.loads(request.body)
        logger.info("CONTACT FORM: JSON parsed successfully")
    except json.JSONDecodeError:
        logger.warning("CONTACT FORM: invalid JSON")
        return JsonResponse({"ok": False, "error": "Invalid request."}, status=400)

    form = ContactForm(data)

    if not form.is_valid():
        logger.warning(f"CONTACT FORM: validation failed -> {form.errors}")
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)

    name = form.cleaned_data["name"]
    sender_email = form.cleaned_data["email"]
    subject = form.cleaned_data["subject"]
    message = form.cleaned_data["message"]

    logger.info(f"CONTACT FORM: from={name}, email={sender_email}")

    body = (
        f"New message from your website contact form\n\n"
        f"Name: {name}\n"
        f"Email: {sender_email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}"
    )

    try:
        logger.info("CONTACT FORM: sending email...")

        email = EmailMessage(
            subject=f"[Contact Form] {subject}",
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_FORM_RECEIVER],
            reply_to=[sender_email],
        )

        email.send(fail_silently=False)

        logger.info("CONTACT FORM: email sent successfully")

    except BadHeaderError:
        logger.error("CONTACT FORM: invalid header error")
        return JsonResponse({"ok": False, "error": "Invalid header found."}, status=400)

    except Exception as e:
        logger.exception("CONTACT FORM: email sending failed")
        return JsonResponse(
            {"ok": False, "error": "Could not send email. Please try again later."},
            status=500,
        )

    return JsonResponse({"ok": True, "message": "Thanks! Your message has been sent."})