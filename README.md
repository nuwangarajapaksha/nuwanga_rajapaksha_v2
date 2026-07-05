# Nuwanga Rajapaksha Portfolio v2 - Django Project

Welcome to my personal portfolio project built with Django. This project showcases my skills, projects, and experience in software development.

## 🚀 Features

- ✅ Clean, modular Django architecture  
- ✅ Dynamic project showcase and resume details  
- ✅ Logging implemented with `concurrent-log-handler` for robust log management  
- ✅ Easy deployment and virtual environment setup instructions  
- ✅ Ready-to-extend for blog, contact form, and additional features  

---

## 🛠️ Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/nuwangarajapaksha/nuwanga_rajapaksha_v2.git
cd nuwanga_rajapaksha_v2
```


### 2. Remove Existing Virtual Environment (Windows PowerShell)

If you have an existing virtual environment and want to start fresh:

```bash
rmdir /s /q venv
```

### 3. Create a New Virtual Environment

Set up a new isolated Python environment:

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

On Windows PowerShell:

```bash
.\venv\Scripts\Activate.ps1
```

On Windows cmd:

```bash
python -m venv venv
```

On Unix or macOS terminal:

```bash
source venv/bin/activate
```

### 5. Upgrade pip and Install Dependencies

Make sure pip is up to date, then install Django and logging dependency:

```bash
pip install --upgrade pip
pip install django
pip install concurrent-log-handler
pip install requests python-dotenv
```

Or install all dependencies using the requirements file:

```bash
pip install -r requirements.txt
```

### 6. Run Database Migrations

Apply Django migrations before starting the server:

```bash
python manage.py migrate
```

### 7. Create a Superuser (Optional)

To access Django admin panel, create a superuser:

```bash
python manage.py createsuperuser
```

### 8. Run the Development Server

Start the Django development server:

```bash
python manage.py runserver
```

The portfolio site will be accessible at `http://127.0.0.1:8000/`.

### 9. Freeze Current Dependencies (Optional)

Save your current environment packages to `requirements.txt`:

```bash
pip freeze > requirements.txt
```

---


# Django + Tailwind CSS Setup Guide

This guide explains how to integrate Tailwind CSS into a Django project using `django-tailwind`.

---

## 🚀 Prerequisites

* Python installed
* Django project created
* Virtual environment activated

---

## 📦 Step 1: Install Dependencies

```bash
python -m pip install django-tailwind
```

---

## ⚙️ Step 2: Configure Django

Add Tailwind to your `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'tailwind',
]
```

---

## 🏗️ Step 3: Initialize Tailwind App

Run the following command:

```bash
python manage.py tailwind init
```

When prompted:

```
Enter Tailwind app name [theme]: theme
```

Choose template:

```
1 - Tailwind v4 Standalone
```

---

## 🧩 Step 4: Register Tailwind App

After creation, update `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'tailwind',
    'theme',
]

TAILWIND_APP_NAME = 'theme'
```

---

## 📥 Step 5: Install Tailwind

```bash
python manage.py tailwind install
```

---

## ▶️ Step 6: Start Tailwind

Run Tailwind in a separate terminal:

```bash
python manage.py tailwind start
```

---

## 🌐 Step 7: Run Django Server

```bash
python manage.py runserver
```

---

## 🎨 Step 8: Use Tailwind in Templates

In your base HTML file:

```html
{% load static %}
<link href="{% static 'css/dist/styles.css' %}" rel="stylesheet">
```

Example usage:

```html
<h1 class="text-3xl font-bold text-blue-500">
  Hello Tailwind!
</h1>
```

---

## 🏗️ Build for Production

```bash
python manage.py tailwind build
```

---

## ⚠️ Common Errors

### ❌ ModuleNotFoundError: No module named 'theme'

* Make sure you ran `tailwind init` first
* Then add `'theme'` to `INSTALLED_APPS`

### ❌ Invalid app name

* Use only: `theme`
* Do NOT use `theme/` or special characters

---

## 💡 Tips

* Keep Tailwind running during development
* Use `python -m pip` instead of `pip` to avoid warnings
* Restart server if styles are not applied

---

## ✅ Done!

Your Django project is now powered by Tailwind CSS 🚀




## 🧑‍💻 Author

**Nuwanga Rajapaksha**  
Full-Stack Software Engineer  
[LinkedIn](https://linkedin.com/in/nuwangarajapaksha) | [GitHub](https://github.com/nuwangarajapaksha)

---

## Notes

- Logging is handled with `concurrent-log-handler` to support robust and concurrent-safe log file rotation.  
- The architecture is modular, making it easy to extend the project with blogs, contact forms, or other features.  
- For deployment on different operating systems or production, consider additional setup such as environment variables, database setup, and static files collection.

---

## License

Would you like me to also create a matching `LICENSE` file for MIT? Let me know!


# Add this to nuwanga_rajapaksha_v1/wsgi.py

https://www.pythonanywhere.com/user/nuwangarajapaksha/files/var/www/nuwangarajapaksha_pythonanywhere_com_wsgi.py?edit

import os
import sys

# Add your project directory to the sys.path
project_home = '/home/nuwangarajapaksha/nuwanga_rajapaksha_v1'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variable for Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'nuwanga_rajapaksha_v1.settings'

# Import Django application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()