def find_k(formula, multiple = 129, limit = 256):
    k = 0
    total = formula(k)
    while total < (limit * multiple):
        if (total % multiple) == 0:
            return k
        k += 1
        total = formula(k)
    raise ValueError("Could not find appropriate value for k.")

def answer(digest):
    message = [None] * len(digest)
    k0 = find_k(lambda k: digest[0] + 256 * k)
    message[0] = (digest[0] + 256 * k0) / 129
    for i in xrange(1, len(digest)):
        ki = find_k(lambda k: (digest[i] + 256 * k) ^ message[i-1])
        message[i] = ((digest[i] + 256 * ki) ^ (message[i-1])) / 129
    return message