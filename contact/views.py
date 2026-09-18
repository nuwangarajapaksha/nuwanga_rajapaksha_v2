import json
import logging

from django.conf import settings
from django.core.mail import BadHeaderError, EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_POST

from .forms import ContactForm

logger = logging.getLogger(__name__)

# Fixed subject so you can identify these emails at a glance.
CONTACT_FORM_SUBJECT = "Message From nuwanga_rajapaksha_v2"

AUTO_REPLY_SUBJECT = "Thanks for reaching out, {name}!"
AUTO_REPLY_BODY = (
    "Hi {name},\n\n"
    "Thanks for getting in touch! I've received your message and will get back to you "
    "as soon as I can.\n\n"
    "For your records, here's a copy of what you sent:\n\n"
    "\"{message}\"\n\n"
    "Best regards,\n"
    "Nuwanga Rajapaksha"
)


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
    message = form.cleaned_data["message"]

    logger.info(f"CONTACT FORM: from={name}, email={sender_email}")

    body = (
        f"New message from nuwanga_rajapaksha_v2 contact form\n\n"
        f"Name: {name}\n"
        f"Email: {sender_email}\n\n"
        f"Message:\n{message}"
    )

    # 1. Send the message to you.
    try:
        logger.info("CONTACT FORM: sending email to admin...")

        admin_email = EmailMessage(
            subject=f"[Contact Form] {CONTACT_FORM_SUBJECT}",
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_FORM_RECEIVER],
            reply_to=[sender_email],
        )
        admin_email.send(fail_silently=False)

        logger.info("CONTACT FORM: admin email sent successfully")

    except BadHeaderError:
        logger.error("CONTACT FORM: invalid header error")
        return JsonResponse({"ok": False, "error": "Invalid header found."}, status=400)

    except Exception:
        logger.exception("CONTACT FORM: admin email sending failed")
        return JsonResponse(
            {"ok": False, "error": "Could not send email. Please try again later."},
            status=500,
        )

    # 2. Send an automatic confirmation reply to the sender.
    # Best-effort: if this fails, we still tell the user their message went
    # through, since it already reached you.
    try:
        logger.info("CONTACT FORM: sending auto-reply to sender...")

        auto_reply = EmailMessage(
            subject=AUTO_REPLY_SUBJECT.format(name=name),
            body=AUTO_REPLY_BODY.format(name=name, message=message),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[sender_email],
        )
        auto_reply.send(fail_silently=False)

        logger.info("CONTACT FORM: auto-reply sent successfully")

    except Exception:
        logger.exception("CONTACT FORM: auto-reply sending failed")

    return JsonResponse({"ok": True, "message": "Thanks! Your message has been sent."})