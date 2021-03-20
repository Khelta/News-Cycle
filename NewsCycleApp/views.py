import json
from django.http import JsonResponse
from rest_framework import status


# Create your views here.
def test(request):
    t = {"Hallo": "Welt"}
    return JsonResponse(t, status=status.HTTP_200_OK)
