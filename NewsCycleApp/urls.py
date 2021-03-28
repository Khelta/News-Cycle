from django.conf.urls import url
from NewsCycleApp import views

urlpatterns = [
    url(r'^api/test', views.topTenByMediumAndLastSevenDays),
]
