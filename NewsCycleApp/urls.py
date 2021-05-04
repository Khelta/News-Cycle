from django.urls import path
from NewsCycleApp import views

urlpatterns = [
    path('api/topTenSevenDays/<str:medium>/', views.topTenByMediumAndLastSevenDays),
    path('api/dataMediumDate/<str:medium>/<str:date>/<int:gt>/<int:max_words>/<str:word_types>/', views.dataByMediumAndDate),
    path('api/wordtypes/', views.Wordtypes.as_view()),
    path('api/media/', views.Media.as_view()),
    path('api/media/update/<str:medium_name>/', views.UpdateMedia.as_view()),
    path('api/words/all/', views.WordsAll.as_view()),
]
