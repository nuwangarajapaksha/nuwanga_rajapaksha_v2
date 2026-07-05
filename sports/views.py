from django.shortcuts import render

# Create your views here.

def sports(request):
    gym_gallery = [
        {
            "title": "Dumbbell Rowing",
            "url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
        },
        {
            "title": "Barbell Deadlift",
            "url": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
        },
        {
            "title": "Cable Rows",
            "url": "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80",
        },
        {
            "title": "Barbell Rowing",
            "url": "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80",
        },
        {
            "title": "Squat Rack",
            "url": "https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=600&q=80",
        },
        {
            "title": "Sit-Ups",
            "url": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
        },
    ]

    context = {
        "gym_gallery": gym_gallery,
    }

    return render(request, 'sports.html', context)