# Nuwanga Rajapaksha Portfolio v2

A modern, responsive personal portfolio website built with **Django 6** and **Tailwind CSS**. This project showcases my software engineering experience, programming projects, photography portfolio, sports achievements, and provides a fully functional contact form with email support.

---

# 🚀 Features

- Modern responsive UI
- Built with Django 6.x
- Tailwind CSS integration
- Modular Django application architecture
- Portfolio showcase
- Programming portfolio
- Photography gallery
- Sports portfolio
- Contact form with Gmail SMTP support
- Environment variable support using python-dotenv
- Console logging configuration
- SEO optimized
- Sitemap.xml
- Robots.txt
- Ready for deployment (PythonAnywhere)

---

---

# 🚀 Local Development Setup

## 1. Clone Repository

```bash
git clone https://github.com/nuwangarajapaksha/nuwanga_rajapaksha_v2.git
cd nuwanga_rajapaksha_v2
```

---

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv
```

### Linux / macOS

```bash
python3 -m venv venv
```

---

## 3. Activate Virtual Environment

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

### Windows CMD

```cmd
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 4. Upgrade pip

```bash
python -m pip install --upgrade pip
```

---

## 5. Install Dependencies

If the project contains a requirements file:

```bash
pip install -r requirements.txt
```

Otherwise install manually:

```bash
pip install django
pip install django-tailwind
pip install python-dotenv
pip install requests
```

---

# 🎨 Tailwind CSS Setup

## Install django-tailwind

```bash
pip install django-tailwind
```

---

## Install Tailwind Dependencies

```bash
python manage.py tailwind install
```

---

## Start Tailwind Development Server

Open a second terminal:

```bash
python manage.py tailwind start
```

---

## Build Tailwind for Production

```bash
python manage.py tailwind build
```

---

# 🗄 Database Setup

Create database tables:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

Create an administrator account:

```bash
python manage.py createsuperuser
```

---

Run the development server:

```bash
python manage.py runserver
```

Website:

```
http://127.0.0.1:8000/
```

Admin Panel:

```
http://127.0.0.1:8000/admin/
```

---

# ⚙ Environment Variables

Create a `.env` file in the project root.

Example:

```env
GMAIL_ADDRESS=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

The project automatically loads environment variables using **python-dotenv**.

Email configuration is read from:

- GMAIL_ADDRESS
- GMAIL_APP_PASSWORD

---

# 📧 Gmail App Password

The contact form uses Gmail SMTP.

Instead of your Gmail password, generate a **Google App Password**.

Google Account

↓

Security

↓

2-Step Verification

↓

App Passwords

Generate a 16-character password and place it inside:

```env
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
```

---

# 📧 Contact Form

The contact form sends emails through Gmail SMTP.

Current configuration:

```python
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = GMAIL_ADDRESS
EMAIL_HOST_PASSWORD = GMAIL_APP_PASSWORD
DEFAULT_FROM_EMAIL = GMAIL_ADDRESS
CONTACT_FORM_RECEIVER = GMAIL_ADDRESS
```

---

# 📝 Logging

Logging is configured using Python's built-in logging module.

Current configuration:

- Console logging
- INFO level
- Timestamped log messages
- Suitable for local development and debugging

Example output:

```
[07/Jul/2026 20:15:42] INFO contact.views - CONTACT FORM: Email sent successfully
```

---

# 📦 Static Files

Current project configuration:

```python
STATIC_URL = "/static/"

STATICFILES_DIRS = [
    BASE_DIR / "theme" / "static",
]

STATIC_ROOT = BASE_DIR / "staticfiles"
```

Collect static files for deployment:

```bash
python manage.py collectstatic
```

---

# 🌍 Deployment (PythonAnywhere)

## Upload Project

```bash
git clone https://github.com/nuwangarajapaksha/nuwanga_rajapaksha_v2.git
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

Activate:

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Static Files

PythonAnywhere

Static URL

```
/static/
```

Static Directory

```
/home/username/nuwanga_rajapaksha_v2/theme/static
```

---

## Collect Static Files

```bash
python manage.py collectstatic
```

---

## Configure WSGI

```python
import os
import sys

project_home = "/home/username/nuwanga_rajapaksha_v2"

if project_home not in sys.path:
    sys.path.insert(0, project_home)

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "nuwanga_rajapaksha_v2.settings"
)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
```

---

## Reload Web App

After deployment:

```
PythonAnywhere Dashboard

↓

Web

↓

Reload
```

---

# 🔍 SEO

Included:

- Meta Tags
- Open Graph Tags
- Twitter Cards
- Canonical URLs
- Sitemap.xml
- Robots.txt
- Favicon
- Responsive Metadata

---

# 🛠 Useful Commands

Run server

```bash
python manage.py runserver
```

Run Tailwind

```bash
python manage.py tailwind start
```

Build Tailwind

```bash
python manage.py tailwind build
```

Create migrations

```bash
python manage.py makemigrations
```

Apply migrations

```bash
python manage.py migrate
```

Create superuser

```bash
python manage.py createsuperuser
```

Collect static files

```bash
python manage.py collectstatic
```

---

# 🐞 Troubleshooting

## Tailwind styles are not updating

Run:

```bash
python manage.py tailwind start
```

or

```bash
python manage.py tailwind build
```

---

## Static files not loading

Run:

```bash
python manage.py collectstatic
```

Verify:

```python
STATIC_URL = "/static/"
```

and

```python
STATICFILES_DIRS = [
    BASE_DIR / "theme" / "static",
]
```

---

## Contact form is not sending emails

Verify:

- Gmail App Password
- GMAIL_ADDRESS
- GMAIL_APP_PASSWORD
- Gmail 2-Step Verification enabled

---

## ModuleNotFoundError

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## WSGI Import Error

Check:

- Project path
- Virtual environment
- Python version
- DJANGO_SETTINGS_MODULE

---

# 📚 Technologies Used

- Django 6
- Python 3
- Tailwind CSS
- HTML5
- CSS3
- JavaScript
- SQLite3
- python-dotenv
- Gmail SMTP

---

# 👨‍💻 Author

**Nuwanga Rajapaksha**

Software Engineer

GitHub

https://github.com/nuwangarajapaksha

LinkedIn

https://linkedin.com/in/nuwangarajapaksha

Portfolio

https://www.nuwangarajapaksha.com

---

# 📄 License

This project is licensed under the MIT License.

See the LICENSE file for details.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Contributions, suggestions, issues, and feature requests are always welcome.