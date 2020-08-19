from django.conf.urls import url
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth_views
from api import views

router = DefaultRouter()
router.register(r'account', views.AccountViewSet)
router.register(r'action', views.ActionViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = router.urls

urlpatterns += [
    url(r'^obtain-auth-token/$', auth_views.obtain_auth_token),
    url(r'^user/(?P<pk>\d+)/$', views.UserUpdateView.as_view())
]
