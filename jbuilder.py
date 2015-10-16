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
        return self.__d[key]

    def __setitem__(self, key, val):
        self.__d[key] = val

    def __delitem__(self, key):
        del self.__d[key]

    def __repr__(self):
        return '{%s}' % ', '.join('%r: %r' % i for i in self.items())

class JsonNode(object):
    ''' A dynamically constructed jBuilder object
        built in the style of Rails's jBuilder
        but 'with' statements rather than 'do'
    '''
    def __init__(self, key=None, parent=None):
        if not parent:
            self.top = self
            self.active_node = self
        else:
            self.top = parent.top

        self.__invoke_count = 0
        self.key, self.parent = key, parent
        self.dct = JMap()
        self.arr = []

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
        return len(self.dct) + len(self.arr)

    def __repr__(self):
        r = repr(self.dct or self.arr)
        if self.top is not self:
            return r
        c = self.__class__.__name__
        return '%s(%s)' % (c, r)

    def __validate(self):
        if self.dct and self.arr:
            msg = "A JSON object can either be a mapping or an array, but not both."
            raise AttributeError(msg)

    def __setitem__(self, key, val):
        self.dct[key] = val

    def __call__(self, val):
        self.parent[self.key] = val

    @method_missing
    def __getattribute__(self, name):
        self.__validate()
        self.__invoke_count += 1
        return JsonNode(name, self.active_node)

    def __enter__(self):
        self.active_node = self
        return self

    def __exit__(self, err_type, err_val, traceback):
        if not self.parent:
            self.active_node = self
            return

        if len(self):
            self.parent[self.key] = self
        self.active_node = self.parent

if __name__ == '__main__':
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
