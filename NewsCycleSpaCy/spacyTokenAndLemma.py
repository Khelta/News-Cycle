import spacy
from os import listdir
from os.path import isfile, join
import json

nlp = spacy.load('de_core_news_sm')
valid_wordtypes = ['NOUN', 'VERB', 'ADJ', 'PROPN']
relative_path = "../NewsCycleScrapy/"

# print([(token.lemma_, token.pos_) for token in test])


def tokenize(files):
    data = {}
    for newssite in files:
        i = 0
        path = join(relative_path, newssite)

        with open(path) as f:
            wordcount = {}
            wordtype = {}

            jsondata = json.load(f)
            for jsonentry in jsondata:

                processed_entry = nlp(' '.join(jsonentry["article"]))
                tokens = [(token.lemma_, token.pos_) for token in processed_entry]

                for token in tokens:
                    if token[1] in valid_wordtypes:
                        if token[0] in wordcount:
                            wordcount[token[0]] += 1
                        else:
                            wordcount[token[0]] = 1
                            wordtype[token[0]] = token[1]

            newsdata = []
            for entry in wordcount:
                newsdata.append({'word': entry, 'count': wordcount[entry], 'type': wordtype[entry]})
            data[i] = ({'medium': newssite[:-5], 'data': newsdata})
            i += 1

    with open('data.json', 'w') as outfile:
        json.dump(data, outfile)


def tokenize_one(medium):
    onlyfiles = [f for f in listdir(relative_path) if isfile(join(relative_path, f)) and f[:-5] == medium]
    if len(onlyfiles) == 1:
        tokenize(onlyfiles)


def tokenize_all():
    onlyfiles = [f for f in listdir(relative_path) if isfile(join(relative_path, f))]
    delete = []
    for entry in onlyfiles:
        if len(entry) > 4:
            if entry[-4:] != "json":
                delete.append(entry)
        else:
            delete.append(entry)
    for entry in delete:
        onlyfiles.remove(entry)

    tokenize(onlyfiles)


if __name__ == "__main__":
    tokenize_all()
