from django.db import models


class Medium(models.Model):
    name = models.CharField(unique=True, max_length=140)
    description = models.TextField(null=True)


class Word(models.Model):
    word = models.CharField(max_length=40, null=False)
    description = models.TextField(null=True)


class Wordcount(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    medium = models.ForeignKey(Medium, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    count = models.IntegerField()

    def __str__(self):
        return "{}, {}, {}, {}".format(self.word.word,
                                       self.count,
                                       self.date,
                                       self.medium.name)

    def rank(self):
        aggregate = Wordcount.objects.filter(medium=self.medium,
                                             date=self.date,
                                             count__gte=self.count)
        return len(aggregate)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['word', 'medium', 'date'],
                                               name='unique words per date')]
