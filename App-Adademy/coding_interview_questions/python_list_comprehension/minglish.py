from collections import defaultdict
from itertools import izip

class Deducer(object):
    @classmethod
    def from_words(cls, words):
        d = cls()
        for word in words:
            d.add(word)
        d.finalize()
        return d

    def __init__(self):
        self.all_letters = set()
        self.comparisons = defaultdict(dict)
        self.prev = ''

    def add(self, word):
        ''' It assumes the words are added in alphabetical order.
            This class definitely has state.
            We find the first letter that is different between the two words
            The letter that came from the passed argument 'word' comes second
            alphbetically, the one from self.prev comes first.
        '''
        for letter in word:
            self.all_letters.add(letter)

        for p,w in izip(self.prev, word):
            if p == w: continue
            self.comparisons[p][w] = 1
            self.comparisons[w][p] = -1
            break

        self.prev = word
        return self

    def pop(self, letter = None):
        letter = letter or self._first_remaining_letter()
        val = self.comparisons.pop(letter)
        for other in self.comparisons:
            sub_dict = self.comparisons[other]
            if sub_dict == {}:
                message = (
                "\n    Cannot construct alphabet with given set of words."
                "\n    The letter %r has no remaining comparisons." % other)
                raise RuntimeError(message)
            if letter in sub_dict:
                del sub_dict[letter]
        return val

    def finalize(self):
        self.alphabet = []
        remaining_letters = set(self.all_letters)
        self.all_letters = frozenset(self.all_letters)

        while remaining_letters:
            try:
                letter = self._first_remaining_letter()
            except RuntimeError:
                raise RuntimeError("Couldn't find places for letters: %r" % remaining_letters)
            remaining_letters.remove(letter)
            self.alphabet.append(letter)
            self.pop(letter)
        
        missing = (self.all_letters - set(self.alphabet))
        if missing:
            raise RuntimeError("Couldn't find places for letters: %r" % missing)
            

    def _first_remaining_letter(self):
        for letter in self.comparisons:
            sub_dict = self.comparisons[letter]
            match = True
            for other in sub_dict:
                if sub_dict[other] == -1:
                    match = False
                    break
            if match:
                return letter
        raise RuntimeError("Cannot find first remaining letter")

def answer(words):
    d = Deducer.from_words(words)
    return ''.join(d.alphabet)

import unittest
class test_answer(unittest.TestCase):
    def test_basic_three_single_letter_pattern(self):
        self.assertEqual(answer(['c','b','a']), 'cba')

    def test_blank_dictionary_returns_empty_string(self):
        self.assertEqual(answer([]), '')

    def test_deduces_order_when_not_obvious_from_first_letter(self):
        words = ['a', 'ae', 'bx','by','bz', 'con','coo','cop','coq',
                 'e', 'f', 'fai','faj','fak',
                 'g', 'h', 'i', 'k', 'l', 'm','martb','martc','martd','marte',
                 'n', 'q', 'r', 's', 't', 'u', 'v', 'w','x'
                 ]
        self.assertEqual(answer(words), 'abcdefghijklmnopqrstuvwxyz')
    
    def test_raises_error_when_not_all_characters_accounted_for(self):
        self.assertRaises(RuntimeError, lambda: answer(['a','b','bc']))