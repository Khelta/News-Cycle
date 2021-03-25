import scrapy
from scrapy.linkextractors.lxmlhtml import LxmlLinkExtractor
from scrapy.http import Request
import regex as re
# x = response.css("a.teaser__link").xpath('@href')


class TagesschauSpider(scrapy.Spider):
    name = 'tagesschau'
    allowed_domains = ['tagesschau.de']
    start_urls = ['http://tagesschau.de/']
    link_extractor = LxmlLinkExtractor(unique=True, restrict_css='a.teaser__link')


    def parse(self, response):
        for link in self.link_extractor.extract_links(response):
            yield Request(link.url, callback=self.parse_item)

        print(self.words)
        print(self.count)

    def parse_item(self, response):
        words = []
        count = []

        text = response.css("p.textabsatz::text").getall()
        for part in text:
            find = re.findall(r'[^\p{P}\p{S}\s\d]+', part.lower())
            for word in find:
                if word in words:
                    count[words.index(word)] += 1
                else:
                    words.append(word)
                    count.append(1)

        yield {"words": words, "count": count}






