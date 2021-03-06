from bs4 import BeautifulSoup
import requests

from .celebrity import Celebrity
from .utilsAPI import WikiAPI, GoogleAPI


class Athlete(Celebrity):
    def __init__(self, name, occupations):
        Celebrity.__init__ (self, name, occupations)
        self.occID = 'athlete'
        self.info = self.retrieve_info(self.name)

    def retrieve_info(self, name):
        info = {
            'bio': WikiAPI().get_bio(self.name),
            'image': GoogleAPI().get_image(self.name),
            'highlights': GoogleAPI().get_youtube_video(self.name + "highlight", "athlete"),
            'twitter': GoogleAPI().get_twitter(self.name),
            'insta': GoogleAPI().get_insta(self.name)
        }
        return info
