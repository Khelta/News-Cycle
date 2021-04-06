from django.urls import path
from NewsCycleApp import views

urlpatterns = [
    path('api/topTenSevenDays/<str:medium>/', views.topTenByMediumAndLastSevenDays),
]
