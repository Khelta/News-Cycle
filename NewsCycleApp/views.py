from datetime import datetime, timedelta
from update import update_single

from django.db.models import Sum
from django.http import JsonResponse
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from NewsCycleApp.models import Wordcount, Medium, Word
from NewsCycleApp.serializers import WordCountSerializer, MediaSerializer, WordSerializer
from NewsCycleApp.viewHelper import transformQuerysetToGraphData


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
    medium = medium.split('+')
    date = date.split('+')
    validDates = []

    for entry in date:
        try:
            datetime.strptime(entry, '%Y-%m-%d')
            validDates.append(entry)
        except ValueError:
            continue

    if len(validDates) == 2:

        data = Word.objects.filter(wordcount__date__gte=validDates[0],
                                   wordcount__date__lte=validDates[1],
                                   wordcount__medium__name__in=medium,
                                   wordcount__count__gt=gt,
                                   wordcount__word__type__in=word_types).annotate(
            total_count=Sum('wordcount__count')).order_by('-total_count')[:max_words]



    else:
        return JsonResponse(data={}, status=status.HTTP_400_BAD_REQUEST)

    data = WordCountSerializer(data, many=True).data
    return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


class Wordtypes(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        # SQLite does not support distinct
        """
        data = Word.objects.all().distinct('type')
        data = TypeSerializer(data, many=True).data
        return JsonResponse({'data': data}, status=status.HTTP_200_OK)
        """

        # So we just hardcode because i dont want to setup a real database
        return Response(data=[{'type': 'NOUN'},
                              {'type': 'ADJ'},
                              {'type': 'VERB'},
                              {'type': 'PROPN'}],
                        status=status.HTTP_200_OK)


class Media(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        data = Medium.objects.all()
        data = MediaSerializer(data, many=True).data
        return Response(data=data, status=status.HTTP_200_OK)


class UpdateMedia(APIView):
    permission_classes = (permissions.AllowAny,)
    valid_media_name = [x.name for x in Medium.objects.all()]

    def get(self, request, medium_name):
        if medium_name not in self.valid_media_name:
            return Response(data={'details': '{} is no valid media name.'.format(medium_name)},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            medium = Medium.objects.get(name=medium_name)
            if medium.last_updated < datetime.today().date():
                try:
                    update_single(medium_name)
                    return Response(data={'details': '{} updated successfully.'.format(medium_name)},
                                    status=status.HTTP_200_OK)
                except Exception as e:
                    return Response(data={'details': e.args}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response(data={'details': '{} already got updated today.'. format(medium_name)},
                                status=status.HTTP_200_OK)


class WordsAll(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        words = Word.objects.all()
        serialize = WordSerializer(words, many=True)
        return Response(data=serialize.data, status=status.HTTP_200_OK)
