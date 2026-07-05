from django.urls import path

from . import views

urlpatterns = [
    path('', views.programming, name='programming'),
    path('modal-content/<str:filename>', views.modal_content, name='modal_content'),
]
