from collections import MutableMapping, OrderedDict

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
