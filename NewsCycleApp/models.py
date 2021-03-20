from django.db import models


class Medium(models.Model):
    name = models.CharField(unique=True, max_length=140)
    description = models.TextField(null=True)


class Word(models.Model):
    word = models.CharField(max_length=40, null=False)
    description = models.TextField(null=True)


class Rank(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    medium = models.ForeignKey(Medium, on_delete=models.CASCADE)
    date = models.DateField()
    rank = models.IntegerField()

    unique_together = ['rank', 'medium', 'date']
