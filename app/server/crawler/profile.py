from .occupation import find_occupations
from .musician import Musician
from .politician import Politician
from .actor import Actor
from .athlete import Athlete
from .public_figure import PublicFigure


class CelebrityFactory(object):

    def __init__(self, names):
        self.names = names

    def construct_profiles(self):
        output = []
        for name in self.names:
            occID, occupations = find_occupations(name)
            if occID == 'musician':
                profile = Musician(name, occupations).generate_profile()
                output.append(profile)
            elif occID == 'politician':
                profile = Politician(name, occupations).generate_profile()
                output.append(profile)
            elif occID == 'actor':
                profile = Actor(name, occupations).generate_profile()
                output.append(profile)
            elif occID == 'athlete':
                profile = Athlete(name, occupations).generate_profile()
                output.append(profile)
            elif occID == 'other':
                profile = PublicFigure(name, occupations).generate_profile()
                output.append(profile)
        return output
