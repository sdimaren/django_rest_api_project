
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User, Post, Admin, Login, Signup, TestToken

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = '__all__'
        extra_kwargs = {'handle': {'required': True}}

class TestTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestToken
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'handle']

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='author')

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_id', 'text', 'date']

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post
    
class UserSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'handle', 'posts']
        read_only_fields = ['posts', 'password']

    def update(self, instance, validated_data):
        validated_data.pop('password', None)
        return super().update(instance, validated_data)
    
    def create(self, validated_data):
        validated_data['handle'] = '@' + validated_data['handle']
        return super(UserSerializer, self).create(validated_data)

    def get_posts(self, obj):
        posts = obj.posts.all().order_by('-date')
        return PostSerializer(posts, many=True).data

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['posts'] = self.get_posts(instance)
        for post in response['posts']:
            post.pop('author', None)
        return response