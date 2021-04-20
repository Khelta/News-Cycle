from django.http import JsonResponse, HttpResponse
from rest_framework import status
from NewsCycleApp.models import Wordcount, Medium, Word
from datetime import datetime, timedelta
from NewsCycleApp.viewHelper import transformQuerysetToGraphData
from NewsCycleApp.serializers import WordCountSerializer, TypeSerializer


# Create your views here.
def test(request):
    t = {"data": [
        {"name": "England",
         "series": [
             {"name": "1", "value": 7400000},
             {"name": "2", "value": 7800000},
             {"name": "3", "value": 7500000},
         ]},
        {"name": "Deutschland",
         "series": [
             {"name": "1", "value": 8400000},
             {"name": "2", "value": 6800000},
             {"name": "3", "value": 9800000},
         ]}]}
    return JsonResponse(t, status=status.HTTP_200_OK)


def topTenByMediumAndLastSevenDays(request, medium):
    referenceDate = datetime.today() - timedelta(days=7)
    data = Wordcount.objects.none()

    for i in range(1, 8):
        date = referenceDate + timedelta(days=i)
        data = data | Wordcount.objects.order_by('-count').filter(date=date, medium__name=medium)[:10]

    data.order_by('word')
    data = transformQuerysetToGraphData(data)

    return JsonResponse(data, status=status.HTTP_200_OK)


def dataByMediumAndDate(request, medium, date, gt, max_words, word_types):
    word_types = word_types.split('+')
    data = Wordcount.objects.filter(date=date,
                                    medium__name=medium,
                                    count__gt=gt,
                                    word__type__in=word_types).order_by('-count')[:max_words]

    data = WordCountSerializer(data, many=True).data
    return JsonResponse({'data': data}, status=status.HTTP_200_OK, safe=False)


def wordTypes(request):
    # SQLite does not support distinct
    """
    data = Word.objects.all().distinct('type')
    data = TypeSerializer(data, many=True).data
    return JsonResponse({'data': data}, status=status.HTTP_200_OK)
    """

    # So we just hardcode because i dont want to setup a real database
    return JsonResponse(data={'data': [{'type': 'NOUN'},
                                       {'type': 'ADJ'},
                                       {'type': 'VERB'},
                                       {'type': 'PROPN'}]})
