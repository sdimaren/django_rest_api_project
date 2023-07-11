# from django.urls import path
# from app.views import UserCreate, Login

# urlpatterns = [
#     path('register/', UserCreate.as_view(), name="user_create"),
#     path('login/', Login.as_view(), name="login"),
# ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app import views
from django.contrib import admin

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'posts', views.PostViewSet)
router.register(r'login', views.LoginViewSet)
router.register(r'signup', views.SignupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login),
    path('signup/', views.signup),
    path('test-token/', views.test_token),
    path('', include(router.urls)),
    path('posts/<uuid:pk>', views.PostViewSet.as_view({'delete': 'destroy'}), name='post-delete'),
    path('users/<uuid:pk>', views.UserViewSet.as_view({'delete': 'destroy'}), name='user-delete'),
]