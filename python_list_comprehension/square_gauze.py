def memoize(func):
    ''' Something, something, "dynamic programing", something something. '''
    from functools import wraps
    cache = {}
    @wraps(func)
    def _memoize(*args):
        if args in cache:
            return cache[args]
        val = func(*args)
        cache[args] = val
        return val
    return _memoize

@memoize
def _gauze(n, sizes = ()):
    if n < 0:
        raise ValueError("n must be non-negative.")
    elif (n > 0) and (not sizes):
        raise ValueError("Cannot make total area with no sizes.")
    elif n == 0:
        return ()
    else:
        sizes = tuple(sizes)

    success = False

    try:
        squares_with_first_size = sizes[:1] + _gauze(n - sizes[0]**2, sizes)
        len_with_first_size = len(squares_with_first_size)
        success = True
    except ValueError:
        len_with_first_size = float('inf')

    try:
        squares_drop_first_size = _gauze(n, sizes[1:])
        len_drop_first_size = len(squares_drop_first_size)
        success = True
    except ValueError:
        len_drop_first_size = float('inf')

    if not success:
        msg = "Impossible to make total area for %s, with %r"
        raise ValueError(msg % (n, sizes))

    if len_with_first_size <= len_drop_first_size:
        return squares_with_first_size
    else:
        return squares_drop_first_size

def answer(n):
    limit = int(n**0.5)
    sizes = tuple(reversed(xrange(1, limit+1)))
    return len(_gauze(n, sizes))
    
def answer(n):
    left_over = n
    x = int(n**0.5) 