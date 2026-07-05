from django.shortcuts import render

# Create your views here.


def portfolio(request):
    context = {
        'tech_icons': [
            'adobe', 'adobe-ps', 'adobe-ai', 'adobe-pr', 'adobe-ae', 'adobe-lr'
        ]
    }
    return render(request, 'portfolio.html', context)