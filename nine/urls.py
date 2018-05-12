"""nine URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from todo_list import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url(r'^login', csrf_exempt(views.login_user), name='login'),
    url(r'^register', csrf_exempt(views.register), name='register'),
    url(r'^add_task', csrf_exempt(views.add_task), name='add_task'),
    url(r'^get_tasks', csrf_exempt(views.get_tasks), name='get_tasks'),
    url(r'^get_task', csrf_exempt(views.get_task), name='get_task'),
    url(r'^edit_task', csrf_exempt(views.edit_task), name='edit_task'),
    url(r'^delete_task', csrf_exempt(views.delete_task), name='delete_task'),
]
