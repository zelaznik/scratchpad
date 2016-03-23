import unittest
from main import *

"""
###################################################
   Unit test the helper methods for the function
###################################################  """

class Test_get_index_pairs(unittest.TestCase):
    def test_zero_returns_empty_sequence(self):
        expected = ()
        actual = tuple(index_pairs(0))
        self.assertEqual(expected, actual)

    def test_three_returns_correct_sequence(self):
        expected = ((0,1),(0,2),(0,3),(1,2),(1,3),(2,3))
        actual = tuple(index_pairs(4))
        self.assertEqual(expected, actual)

def get_expected_length(array):
    count = 0
    for item in index_pairs(len(array)):
        count += 1
    return count

class TestDigits(object):
    def test_digits_total_lengths_match(self):
        array = self.digits
        pi_pair_sums = pair_sums(array)
        expected_length = get_expected_length(array)
        actual_length = sum(len(v) for v in pi_pair_sums.values())
        self.assertEqual(expected_length, actual_length)

    def test_digits_pairs_sum_up_as_expected(self):
        array = self.digits
        pi_pair_sums = pair_sums(array)
        for expected_sum, pairs in pi_pair_sums.iteritems():
            for x , y in pairs:
                actual = array[x] + array[y]
                self.assertEqual(expected_sum, actual)

class test_pair_sums_DigitsOfPi(unittest.TestCase, TestDigits):
    digits = [3,1,4,1,5,9,2,6,5]

class test_pair_sums_DigitsOfE(unittest.TestCase, TestDigits):
    digits = [2,7,1,8,2,8,1,8,2,8,4,5]

"""
###################################################
   Run simulations to check against naive approach.
###################################################  """

def index_triples(n):
    ''' All x, y, z such that 0 <= x < y < z < n '''
    for x in xrange(n):
        for y in xrange(x+1, n):
            for z in xrange(y+1, n):
                yield x , y , z

def matching_triples_naive(array, total):
    for x, y, z, in index_triples(len(array)):
        if array[x] + array[y] + array[z] == total:
            yield frozenset([x,y,z])

from random import randint
class TestMonteCarlo(object):
    def test_equals_naive(self):
        n2 = randint(0, 30)
        n1 = int(n2 / 2)
        arr = [11 * randint(0,n1) for _ in xrange(n2)]
        total = 11 * n1

        naive = frozenset(matching_triples_naive(arr,total))
        fast = matching_triples(arr, total)

        if (fast is None and len(naive) == 0):
            return
        if (fast is not None and fast in naive):
            return

        msg = "Failed for arr = %r, expected %r, got %r" % (arr, naive, fast)
        raise AssertionError(msg)

for trial in xrange(0, 128):
    """ Add a different test case for each trial. """
    name = 'test_monteCarlo_trial_%04d' % trial
    bases = (TestMonteCarlo, unittest.TestCase)
    cls = type(name, bases, {'trial': trial})
    globals().update({name: cls})

if __name__ == '__main__':
    unittest.main()
