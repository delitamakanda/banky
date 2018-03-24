from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'account', views.AccountViewSet)
router.register(r'action', views.ActionViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^signup/', views.UserCreate.as_view(), name='signup'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='auth')),
]
