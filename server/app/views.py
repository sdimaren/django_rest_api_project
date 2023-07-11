# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate
# from rest_framework.authtoken.models import Token
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import permissions
# from .serializers import UserSerializer

# class UserCreate(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             if user:
#                 token = Token.objects.get(user=user)
#                 json = serializer.data
#                 json['token'] = token.key
#                 return Response(json, status=201)
#         return Response(serializer.errors, status=400)


# class Login(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             token = Token.objects.get(user=user)
#             return Response({"token": token.key})
#         else:
#             return Response({"error": "Wrong Credentials"}, status=400)


from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer
from rest_framework import viewsets
from .models import User, Post, Admin, Login, Signup, TestToken
from .serializers import UserSerializer, PostSerializer, AdminSerializer, LoginSerializer, SignupSerializer, TestTokenSerializer
from django.core.exceptions import MultipleObjectsReturned
from rest_framework.exceptions import PermissionDenied
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from .authentication import CustomTokenAuthentication
from rest_framework.views import APIView
from rest_framework.decorators import action

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class LoginViewSet(viewsets.ModelViewSet):
    queryset = Login.objects.all()
    serializer_class = LoginSerializer

class SignupViewSet(viewsets.ModelViewSet):
    queryset = Signup.objects.all()
    serializer_class = SignupSerializer

class TestTokenViewSet(viewsets.ModelViewSet):
    queryset = TestToken.objects.all()
    serializer_class = TestTokenSerializer
# Create your views here.
@api_view(["POST"])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    store_token, _ = TestToken.objects.get_or_create(token=token.key, user=user)

    serializer = UserSerializer(user)

    return Response({'token': store_token.token, 'user': serializer.data})

@api_view(["POST"])
def signup(request):
      serializer = UserSerializer(data=request.data)
      if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data})
      return Response(serializer.errors, status=400)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        lookup_value = self.kwargs.get('pk')
        queryset = self.get_queryset()

        if lookup_value.isdigit():
            filter_kwargs = {"pk": lookup_value}
        else:
            filter_kwargs = {"username": lookup_value}

        obj = get_object_or_404(queryset, **filter_kwargs)
        return obj
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('date')
    serializer_class = PostSerializer

    def get_object(self):
        lookup_value = self.kwargs.get(self.lookup_field)

        try:
            return self.queryset.get(author__username=lookup_value)
        except (Post.DoesNotExist, MultipleObjectsReturned):
            pass

        try:
            return self.queryset.get(id=lookup_value)  
        except (Post.DoesNotExist, MultipleObjectsReturned):
            pass

        raise Http404  

def perform_create(self, serializer):
    if self.request.user.is_authenticated:
        serializer.save(author=self.request.user)
    else:
        raise PermissionDenied("You need to be logged in to post a message.")

class DeletePost(APIView):
    authentication_classes = [CustomTokenAuthentication]

    def delete(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)

        if post.user_id != request.user.id:
            return Response({'error': 'You do not have permissions for this operation.'}, status=403)

        post.delete()

        return Response(status=204)