from __future__ import division, print_function
    
def answer(n):
    lkp = (('-',0),('R',0),('L',1))
    digits = []
    while n != 0:
        q, r = divmod(n, 3)
        b, c = lkp[r]
        digits.append(b)
        n = q + c
    return digits

def to_int(items):
    ''' Reversed method created for unit testing. '''
    lkp = {'L':-1, 'R': 1, '-': 0}
    total = 0
    factor = 1
    for item in items:
        total += factor * lkp[item]
        factor *= 3
    return total
        
def __unit_tests():
    ''' Make sure the answer is reversible between +/- 1 million. '''
    for i in range(-10**6, 10**6):
        t = answer(i)
        got = to_int(t)
        if i != got:
            msg = 'Converted %r, expected %r, got %r.'
            raise AssertionError(msg % (t, i, got))


    
        
    