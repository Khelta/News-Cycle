def transformQuerysetToGraphData(queryset):
    data = {"data": []}
    print(len(queryset))
    for entry in queryset:
        if not any(d['name'] == entry.word.word for d in data["data"]):
            data["data"].append({'name': entry.word.word,
                                 'series': [{'name': entry.date,
                                             'value': entry.rank()}]})
        else:
            for i in range(0, len(data["data"])):
                if data["data"][i]["name"] == entry.word.word:
                    data["data"][i]["series"].append({'name': entry.date,
                                                      'value': entry.rank()})
                    break
    return data
