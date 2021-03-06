from rest_framework import serializers
from NewsCycleApp.models import Medium, Word, Wordcount


class MediumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medium
        fields = ['name']


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['word', 'type']


class WordCountMediumSerializer(serializers.ModelSerializer):
    word_word = serializers.CharField(source='word.word')
    medium_name = serializers.CharField(source='medium.name')

    class Meta:
        model = Wordcount
        fields = ['word_word', 'count', 'medium_name']


class WordCountSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='word')
    value = serializers.IntegerField(source='total_count', read_only=True)

    class Meta:
        model = Word
        fields = ['name', 'value']


class TypeSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='type')

    class Meta:
        model = Word
        fields = ['type']


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medium
        fields = '__all__'
