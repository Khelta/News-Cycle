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


    def parse_item(self, response):
        paragraphs = []

        text = response.css("p.textabsatz::text").getall()
        for part in text:
            paragraphs.append(part)

        yield {"article": paragraphs}






