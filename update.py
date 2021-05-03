import sys, os
from os import listdir
from os.path import isfile, join
from NewsCycleSpaCy.spacyTokenAndLemma import tokenize_one, tokenize_all
from NewsCycleApp.importData import import_data


dir_path = os.path.dirname(os.path.realpath(__file__))
path_scrapy_spiders = os.path.realpath("./NewsCycleScrapy/NewsCycleScrapy/spiders")
path_scrapy = os.path.realpath("./NewsCycleScrapy/")
path_spacy = os.path.realpath("./NewsCycleSpaCy")
path_django = os.path.realpath("./NewsCycleApp")

python = os.path.realpath("./venv/Scripts/python.exe")
scrapy = os.path.realpath("./venv/Scripts/scrapy.exe")
spacy_scriptname = 'spacyTokenAndLemma.py'
django_scriptname = 'importData.py'


def update_single(medium):
    # scrapy
    os.chdir(path_scrapy)
    os.system('{} crawl {} -O {}.json'.format(scrapy, medium, medium))

    # spacy
    os.chdir(path_spacy)
    tokenize_one(medium)

    # django
    os.chdir(path_django)
    import_data()


def update_all():
    # scrapy
    onlyFilesSpiders = [f for f in listdir(path_scrapy_spiders)
                        if isfile(join(path_scrapy_spiders, f))]
    onlyFilesSpiders.remove("__init__.py")

    spiders = [f[:-3] for f in onlyFilesSpiders]

    os.chdir(path_scrapy)
    for spider in spiders:
        os.system('{} crawl {} -O {}.json'.format(scrapy, spider, spider))

    # scacy
    os.chdir(path_spacy)
    tokenize_all()

    # django
    os.chdir(path_django)
    os.system('{} {}'.format(python, django_scriptname))


if __name__ == "__main__":
    # update_all()
    update_single('tagesschau')
