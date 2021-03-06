import unittest
from make_change import make_change

class test_MakeChange(unittest.TestCase):
    def test_empty_coins_raises_error(self):
        self.assertRaises(ValueError, make_change, 14, [])

    def test_zero_amount_returns_empty(self):
        self.assertEqual(make_change(0, [5]), ())

    def test_14_with_25_10_7_5_1_returns_7_7(self):
        self.assertEqual(make_change(14, [25, 10, 7, 5, 1]), (7,7))

    def test_14_with_25_10_8_5_raises_error(self):
        self.assertRaises(ValueError, make_change, 14, [25, 10, 8, 5])

    def test_14_with_20_10_8_5_1_returns_8_5_1(self):
        self.assertEqual(make_change(14, [25, 10, 8, 5, 1]), (8, 5, 1))

    def test_14_with_20_10_5_1_returns_10_1_1_1(self):
        self.assertEqual(make_change(14, [25, 10, 5, 1]), (10,1,1,1,1))

    def test_15_with_20_10_8_5_returns_10_5(self):
        self.assertEqual(make_change(15, [25, 10, 8, 5]), (10, 5))

    def test_coins_must_be_in_desc_order(self):
        self.assertRaises(Exception, make_change, 14, [25, 1, 5, 10])

if __name__ == '__main__':
    unittest.main()
