from collections import defaultdict

def index_pairs(n):
    ''' All x, y such that 0 <= x < y < n '''
    for x in xrange(n):
        for y in xrange(x+1, n):
            yield x , y

def pair_sums(array):
    pairs = defaultdict(set)
    for x , y in index_pairs(len(array)):
        value = array[x] + array[y]
        pairs[value].add((x,y))

    return pairs

def matching_triples(array, total):
    ''' Load all the pair sums, then iterate through the array, looking for
        pairs that add up to the remaining value, return 1st match. '''

    two_sums = pair_sums(array)
    for x, value_x in enumerate(array):
        complement = total - value_x
        for y , z in two_sums[complement]:
            if (x == y or x == z ):
                continue
            return frozenset([x,y,z])
