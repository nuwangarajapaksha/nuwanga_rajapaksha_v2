from django.http import Http404
from django.shortcuts import render

# Create your views here.

def programming(request):
    context = {
        'tech_icons': ['java', 'javascript', 'python', 'php', 'go', 'spring-boot', 'react', 'django', 'fastapi',
                       'vue-js', 'mysql', 'mongodb', 'firebase', 'html5', 'css', 'bootstrap', 'material-ui', 'aws',
                       'google-cloud', 'docker', 'windows', 'android', 'git', 'github', 'gitlab', 'bitbucket', 'jira',
                       'postman', 'swagger']
    }

    return render(request, 'programming.html', context)


def modal_content(request, filename):
    templates = {
        'melioraa.html': {
            'images': [f'melioraa{i:02d}' for i in range(2, 10)],
            'tech_icons': ['java', 'spring-boot', 'mysql', 'react', 'javascript', 'html5', 'css', 'material-ui',
                           'bootstrap', 'postman', 'swagger', 'git', 'gitlab', 'jira', 'aws', 'azure', 'digitalocean']
        },
        'dialog_power_app.html': {
            'images': [f'dialog-power-app{i:02d}' for i in range(2, 11)],
            'tech_icons': ['java', 'spring-boot', 'mysql', 'react', 'redux', 'javascript', 'html5', 'css', 'bootstrap',
                           'material-ui', 'flutter', 'android', 'postman', 'swagger', 'git', 'gitlab', 'jira', 'aws',
                           'docker']
        },
        'morex.html': {
            'images': [f'morex{i:02d}' for i in range(2, 13)],
            'tech_icons': ['php', 'mysql', 'vue-js', 'javascript', 'html5', 'css', 'bootstrap', 'grafana', 'git',
                           'gitlab', 'jira']
        },
        'ndcamera.html': {
            'images': [f'ndcamera{i:02d}' for i in range(2, 27)],
            'tech_icons': ['java', 'mysql', 'javascript', 'html5', 'css', 'bootstrap', 'android', 'firebase']
        },
        'pamunuwila_hardware.html': {
            'images': [f'pamunuwila-hardware{i:02d}' for i in range(2, 51)],
            'tech_icons': ['java', 'mysql']
        },
        'adyapana.html': {
            'images': [f'adyapana{i:02d}' for i in range(2, 15)],
            'tech_icons': ['java', 'mysql']
        },
        'opd_channeling.html': {
            'images': [f'opd-channeling{i:02d}' for i in range(2, 26)],
            'tech_icons': ['php', 'mysql', 'javascript', 'html5', 'css', 'bootstrap']
        },
        'imagescave.html': {
            'images': [f'imagescave{i:02d}' for i in range(2, 16)],
            'tech_icons': ['php', 'mysql', 'javascript', 'html5', 'css', 'bootstrap']
        },
        'election_sri_lanka.html': {
            'images': [f'election-sri-lanka{i:02d}' for i in range(2, 25)],
            'tech_icons': ['php', 'mysql', 'javascript', 'html5', 'css', 'bootstrap']
        },
        'health_first.html': {
            'images': [f'health-first{i:02d}' for i in range(2, 18)],
            'tech_icons': ['javascript', 'html5', 'css', ]
        }
    }

    if filename not in templates:
        raise Http404("Template not allowed")

    context = templates[filename]  # Gets both 'images' and 'tech_icons'
    return render(request, filename, context)