from django.urls import path
from NewsCycleApp import views

urlpatterns = [
    path('api/topTenSevenDays/<str:medium>/', views.topTenByMediumAndLastSevenDays),
    path('api/dataMediumDate/<str:medium>/<str:date>/<int:gt>/', views.dataByMediumAndDate)
]
