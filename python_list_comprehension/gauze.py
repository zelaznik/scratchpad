def is_sorted_desc(arr):
    for i in range(1, len(arr)):
        if arr[i] > arr[i - 1]:
            return False
    return True

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

def gauze(n, sizes=()):
    assert is_sorted_desc(sizes), "sizes not sorted in desc order."
    return _gauze(n, sizes)

def answer(n):
    limit = int(sqrt(n))
    sizes = list(xrange(1, limit+1))
    return len(gauze(n, sizes))