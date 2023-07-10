from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth_views
from api import views

router = DefaultRouter()
router.register('account', views.AccountViewSet)
router.register('action', views.ActionViewSet)
router.register('users', views.UserViewSet)
router.register('transactions', views.TransactionViewSet)
router.register('keys-performance-indicators', views.KeysPerformanceIndicatorViewSet)
router.register('products', views.ProductViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('obtain-auth-token/', auth_views.obtain_auth_token),
    path('deposit/', views.deposit),
    path('withdraw/', views.withdraw),
    path('user/<int:pk>/', views.UserUpdateView.as_view())
]
