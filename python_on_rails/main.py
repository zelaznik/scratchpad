from jbuilder import *

from collections import namedtuple

Person = namedtuple('Person', ('first', 'last'))

people = [
    Person('Steve','Zelaznik'),
    Person('Michael','Kisselburgh'),
    Person('Barack','Obama')
]

json = JsonNode()

class JsonPointer(object):
    def __init__(self, iterable):
        self.iterable = iterable
        self.callbacks = []

    @method_missing
    def __getattribute__(self, name):
        def binding(*args, **kw):
            def callback(obj):
                func = getattr(obj, name)
                return func(*args, **kw)
            return callback
        return binding

    def __call__(self, obj):
        pass

with json.array(people) as p:
    json.first(p.first)
    json.last(p.last)

    with json('other'):
        json.x(3)
        json.y(4)
        json.z(5)
