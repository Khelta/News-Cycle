import sys, os
from os import listdir
from os.path import isfile, join


dir_path = os.path.dirname(os.path.realpath(__file__))
path_scrapy_spiders = os.path.realpath("./NewsCycleScrapy/NewsCycleScrapy/spiders")
path_scrapy = os.path.realpath("./NewsCycleScrapy/")
path_spacy = os.path.realpath("./NewsCycleSpaCy")
path_django = os.path.realpath("./NewsCycleApp")

python = os.path.realpath("./venv/Scripts/python.exe")
scrapy = os.path.realpath("./venv/Scripts/scrapy.exe")
spacy_scriptname = 'spacyTokenAndLemma.py'
django_scriptname = 'importData.py'

if __name__ == "__main__":
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

    os.system('{} {}'.format(python, spacy_scriptname))

    # django
    os.chdir(path_django)
    os.system('{} {}'.format(python, django_scriptname))
