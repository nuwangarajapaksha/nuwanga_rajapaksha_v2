from django.shortcuts import render

# Create your views here.
GALLERY_CATEGORIES = [
    ("wildlife", "Wildlife", [
        "Deer",
        "Swamphen",
        "Sambar Deer",
        "Black Monkey",
        "Elephant & Wild Bore",
        "Dove",
        "Dragenfly",
    ]),
    ("landscape", "Landscape", [
        "Devil's Staircase Road, Kalupahana",
        "Devil's Staircase Road, Kalupahana",
        "Devil's Staircase Road, Kalupahana",
        "Galle Fort Beach",
        "Galle Fort Beach",
        "Nainativu Nagapooshani Amman Kovil",
        "Sunset",
    ]),
    ("model", "Model", [
        "Natasha Roshel",
        "Natasha Roshel",
        "Tenura",
        "Tenura",
        "Tenura",
        "Natasha Roshel",
        "Natasha Roshel",
    ]),
    ("event", "Event", [
        "Birthday",
        "Birthday",
        "Birthday",
        "Baby",
        "Baby",
        "Group",
        "Birthday",
    ]),
]

def photography(request):
    categories = []

    for slug, label, titles in GALLERY_CATEGORIES:
        photos = [
            {
                "src": f"images/photography/{slug}/{slug}{str(i).zfill(2)}.png",
                "title": title,
            }
            for i, title in enumerate(titles, start=1)
        ]

        categories.append({
            "slug": slug,
            "label": label,
            "photos": photos,
        })

    context = {
        "gallery_categories": categories,
    }

    return render(request, "photography.html", context)

# Add this to the view that renders the gallery page.
# Each entry is (slug, label, [titles...]) — one title per photo, in order
# (titles[0] -> slug01.png, titles[1] -> slug02.png, etc).
# Edit the caption text below to whatever each photo should say.







# In your view function:
#
# def portfolio(request):
#     context = {
#         "gallery_categories": build_gallery_categories(),
#         # ...other context...
#     }
#     return render(request, "portfolio.html", context)