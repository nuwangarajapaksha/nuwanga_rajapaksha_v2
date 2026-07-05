# Add this to your app's urls.py (merge with existing urlpatterns,
# don't just paste this whole file over your existing one)

from django.urls import path

from . import views

urlpatterns = [
    # ... your other url patterns
    path('', views.contact_submit, name="contact_submit"),
]