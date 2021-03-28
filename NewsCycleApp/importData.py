import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "NewsCycle.settings")
django.setup()

import json
from NewsCycleApp.models import Word, Medium, Wordcount

relative_path = "../NewsCycleSpaCy/data.json"

if __name__ == "__main__":
    with open(os.path.abspath(relative_path)) as f:
        jsondata = json.load(f)
        for websiteIndex in jsondata:
            mediumName = jsondata[websiteIndex]["medium"]
            data = jsondata[websiteIndex]["data"]

            if len(Medium.objects.all().filter(name=mediumName)) == 0:
                newMedium = Medium(name=mediumName)
                newMedium.save()
            medium = Medium.objects.get(name=mediumName)

            for entry in data:
                if len(Word.objects.all().filter(word=entry["word"])) == 0:
                    word = Word(word=entry["word"])
                    word.save()
                else:
                    word = Word.objects.get(word=entry["word"])
                wordcount = Wordcount(word=word, medium=medium, count=entry["count"])
                print(wordcount.word.word)
                wordcount.save()


