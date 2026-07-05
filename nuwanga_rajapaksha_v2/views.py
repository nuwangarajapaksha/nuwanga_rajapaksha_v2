# views.py in the main app or project folder
from django.shortcuts import render
from django.shortcuts import render



def index(request):
    return render(request, 'index.html')

