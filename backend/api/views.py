from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

"""
rename these as needed, just set up some standard requests we need
also the get/post shit might be wrong so change where needed
"""

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'test'})

@api_view(['POST'])
def login(request):
    print(request.body)
    """
    when a user tries to log in, need to ensure their username and password match those in the db
    """
    return Response({'message':'check the user details are correct'})

@api_view(['POST'])
def register(request):
    """
    when a user registers, need to see if the username is unique
    """
    return Response({'message':'check if the the username is in use'})