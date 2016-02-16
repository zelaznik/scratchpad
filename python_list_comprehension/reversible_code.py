class Code(object):
    ''' Level 2 '''
    __slots__ = ('__word','__h')

    def __init__(self, word):
        self.__word = word

    def __repr__(self):
        c = self.__class__.__name__
        return '%s(%r)' % (c, self.__word)
        
    @property
    def regular(self):
        return self.__word
        
    @property
    def backward(self):
        return ''.join(reversed(self.__word))

    def __eq__(self, other):
        if not isinstance(other, Code):
            return NotImplemented
        elif self.regular == other.regular:
            return True
        elif self.reversed == other.reversed:
            return True
        else:
            return False

    def __hash__(self):
        try:
            return self.__h
        except AttributeError:
            self.__h = hash(self.regular) ^ hash(self.backward)
            return self.__h
            
def answer(x):
    return len(set(Code(elem) for elem in x))