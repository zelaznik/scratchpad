def answer_1(x):
    if int(x) != abs(x):
        raise ValueError("Input must be a non-negative integer.")

    while x >= 10:
        total = 0
        while x >= 1:
            total += x % 10
            x /= 10
        x = total

    return x

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
        elif self.regular == other.backward:
            return True
        else:
            return False

    def __hash__(self):
        try:
            return self.__h
        except AttributeError:
            self.__h = hash(self.regular) ^ hash(self.backward)
            return self.__h

def answer_2(x):
    return len(set(Code(i) for i in x))

from math import log, ceil
def get_place(number):
    decimal = log(number) / log(3)
    return int(ceil(decimal))

def base_3_plus(number):
    # Find the largest power of 3
    # then work your way down.
    output = {}
    place = get_place(number)
    total = 3 ** place
    while place >= 0:
        if total > number:
            






if __name__ == '__main__':
    import unittest
    class test_base_3_plus(unittest.TestCase):
        pass




if __name__ == '__main__':
    unittest.main()

















