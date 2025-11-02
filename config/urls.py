"""bank URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import permissions

class PublicSpectacularAPIView(SpectacularAPIView):
    permission_classes = [permissions.AllowAny]

class PublicSpectacularRedocView(SpectacularRedocView):
    permission_classes = [permissions.AllowAny]

class PublicSpectacularSwaggerView(SpectacularSwaggerView):
    permission_classes = [permissions.AllowAny]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path(
        'swagger/schema/',
        PublicSpectacularAPIView.as_view(),
        name='schema',
    ),
    path(
        'swagger/',
        PublicSpectacularSwaggerView.as_view(url_name='schema'),
        name='schema-swagger-ui'
    ),
    path(
        'redoc/',
        PublicSpectacularRedocView.as_view(url_name='schema'),
        name='schema-redoc'
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
