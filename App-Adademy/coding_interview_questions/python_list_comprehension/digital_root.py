def answer(x):
    ''' Level 1 '''
    if x < 0:
        raise ValueError("Input must be non-negative.")
    while x >= 10:
        total = 0
        while x >= 1:
            total += x % 10
            x /= 10
        x = total
    return x