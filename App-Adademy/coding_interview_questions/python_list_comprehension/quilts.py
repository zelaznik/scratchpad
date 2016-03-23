import sys
from math import sqrt

class GuaranteedRecursionDepth(object):
    __slots__ = ('limit','old_limit')
    def __init__(self, limit):
        self.limit = limit

    def __enter__(self):
        self.old_limit = sys.getrecursionlimit()
        new_limit = max(self.limit, self.old_limit)
        sys.setrecursionlimit(new_limit)

    def __exit__(self, *exc):
        sys.setrecursionlimit(self.old_limit)
        


def g(n, cache={}, level=0):
    if n in cache:
        return cache[n]

    c = int(sqrt(n))
    if (n == 0):
        cache[n] = 0
        return 0
    elif (n == c*c):
        cache[n] = 1
        return 1

    shortest_length = float('inf')
    for i in xrange(1, c+1):
        i_sq = i * i
        temp = g(n-i_sq, cache, level+1) + g(i_sq, cache, level+1)
        if temp < shortest_length:
            shortest_length = temp
        if temp == 2:
            break # This isn't a perfect square, so 2 is the best we can do.
    
    cache[n] = shortest_length
    return shortest_length

def answer(n):
    with GuaranteedRecursionDepth(n):
        return g(n)
        
for i in range(1, 1000):
    print('%d: %r' % (i, f(i)))

    
