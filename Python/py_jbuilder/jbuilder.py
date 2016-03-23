from collections import OrderedDict, MutableMapping

def method_missing(func):
    def __getattribute__(self, name):
        try:
            return object.__getattribute__(self, name)
        except AttributeError:
            pass
        return func(self, name)
    return __getattribute__

class JMap(MutableMapping):
    def __init__(self):
        self.__d = OrderedDict()

    def __iter__(self):
        return iter(self.__d)

    def __len__(self):
        return len(self.__d)

    def __getitem__(self, key):
        return self.__d[str(key)]

    def __setitem__(self, key, val):
        self.__d[str(key)] = val

    def __delitem__(self, key):
        del self.__d[str(key)]

    def __repr__(self):
        return '{%s}' % ', '.join('"%s": %r' % i for i in self.items())

class JsonNode(object):
    ''' A dynamically constructed jBuilder object
        built in the style of Rails's jBuilder
        but 'with' statements rather than 'do'
    '''
    def __init__(self, key=None, parent=None):
        if parent is None:
            self.top = self
            self.active_node = self
        else:
            self.top = parent.top

        self.key, self.parent = key, parent
        self.dct = JMap()

    @property
    def active_node(self):
        if self is self.top:
            return self.__active_node
        else:
            return self.top.active_node

    @active_node.setter
    def active_node(self, val):
        if self is self.top:
            self.__active_node = val
        else:
            self.top.active_node = val

    def __len__(self):
        return len(self.dct)

    def __repr__(self):
        r = repr(self.dct)
        if self.top is not self:
            return r
        c = self.__class__.__name__
        return '%s(%s)' % (c, r)

    def __setitem__(self, key, val):
        self.dct[key] = val

    def __call__(self, val):
        if self.parent is None:
            raise RuntimeError("The JSON Root node is not callable.")
        self.parent[self.key] = val

    @method_missing
    def __getattribute__(self, name):
        return JsonNode(name, self.active_node)

    def array(self, iterable):
        return JsonArray(name, self.active_node, iterable)

    def __enter__(self):
        self.active_node = self
        return self

    def __exit__(self, err_type, err_val, traceback):
        if self.parent is None:
            self.active_node = self
            return
        # Attach the node to the parent
        # Cede control back to the parent
        self.parent[self.key] = self
        self.active_node = self.parent

class ArrayBuilder(object):
    def __init__(self, iterable):
        self.iterable = iter(iterable)

    def __iter__(self):
        return self

    def next(self):
        try:
            item = next(self.iterable)
            node = JSONNode(None, )
        finally:
            pass
        return next(self.iterable)
    __next__ = next



class JsonArray(JsonNode):
    def __init__(self, key, parent, iterable):
        JsonNode.__init__(self, key, parent)
        self.iterable = iter(iterable)
        self.count = 0

    def __iter__(self):
        return self

    def set(self, val):
        self[self.count] =

    def next(self):

        return next(self.iterable)
    __next__ = next

    def __enter__(self):
        self.block = Block(node)
        return self.block

    def __exit__(self, err_type, err_val, traceback):
        if not err_type:
            map(self.block, self.iterable)

def main():
    with JsonNode() as json:
        json.x(3)
        json.y(4)
        with json.z:
            json.a(0)
            json.b(1)
            json.c(2)
            with json.d:
                json.Chris('Grimm')
        json.w(7)
        with json.steve:
            json.first_name('Steve')
            json.last_name('Zelaznik')
        json.Michael('Zelaznik')
    return json

def example():
    from collections import namedtuple
    Person = namedtuple('Person',('first','last'))
    people = [
        Person('Steven','Zelaznik'),
        Person('Michael','Zelaznik'),
        Person('Barack','Obama')
    ]

    with JsonNode() as json:
        json.content('This is serious.')
        with json.author:
            json.name('David H')
            json.email('david@heinemeierhansson.com')
            json.url('http://example.com/users/1-david.json')
        json.visitors(15)

        for p in json.array(people):
            json.first_name(p.first)
            json.last_name(p.last)

    return json

if __name__ == '__main__':
    json = example()
    print(json)
