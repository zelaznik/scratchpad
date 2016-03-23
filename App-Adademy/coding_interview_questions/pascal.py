from collections import Iterable
import inspect

class Generator(Iterable):
    def __init__(self, *args):
        self.args = args

    def __repr__(self):
        c = self.__class__.__name__
        r = (str(i) for i in self.args)
        return '%s(%s)' % (c, ', '.join(r))

def reusable(func):
    ''' Turns any exhaustable genrator into a reusable one. '''
    dct = {
        '__doc__': func.__doc__,
        'func': func, '__slots__': (),
        '__iter__': lambda self: func(*self.args)
    }
    return type(func.__name__, (Generator,), dct)

@reusable
def pascal(level):
    ''' Returns the (n)th row of pascal's triangle. '''
    if level < 0:
        return

    left = 0
    for right in pascal(level-1):
        yield (left + right)
        left = right
    yield 1

@reusable
def indices(max_val, level)d:
    if level <= 0:
        return

    if level == 1:
        for index in xrange(max_val):
            yield [index]
        return

    for sub in indices(max_val, level-1):
        for index in xrange(sub[-1]+1, max_val):
            yield sub + [index]

@reusable
def combinations(arr, size):
    for X in indices(len(arr), size):
        yield tuple(arr[x] for x in X)
