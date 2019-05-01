from .celebrity import Celebrity
from .wikiAPI import search_wiki
from .wikiAPI import get_image

class OtherCelebrity(Celebrity):
    def __init__(self, name, occupations):
        Celebrity.__init__ (self, name, occupations)
        self.occID = 'other'
        self.info = self.retrieve_info()
    
    def retrieve_info(self):
        info = {}
        wiki_data = search_wiki(self.name)
        wiki_desc = wiki_data[2][0]
        info['bio'] = wiki_desc
        info['image']= get_image(self.name)
        return info
