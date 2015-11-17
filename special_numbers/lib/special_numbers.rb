def ones_places(n)
  ''' Returns an array of powers of 2 that in desc order
      such that n == (arr.map {|x| 2**x}).inject(:+)
  '''
  if n < 0
    raise ArgumentError.new("n must be positive")
  elsif n == 0
    final = []
  else
    max_digit = Math.log(n, 2).floor + 1
    b = ("%#{max_digit}b" % n).reverse

    final = []
    (0...b.length).each do |i|
      final << i if b[i].to_i == 1
    end
  end

  final.reverse
end

def n_choose_k(n, k)
  numerator = n.downto(n-k+1).inject(1, :*)
  denominator = k.downto(1).inject(1, :*)
  (numerator/denominator).round(0).floor
end

def ones_needed(offset, digits)
  start = (offset == 0) ? 1 : 0
  (start..digits).select do |d|
    total = d + offset
    (total == Math.sqrt(total).round(0) ** 2)
  end
end

def matches_in_range(offset, digits)
  get_ones = ones_needed(offset, digits)
  combos = get_ones.map {|k| n_choose_k(digits, k)}
  combos.inject(0, :+)
end

def matches_less_than(num)
  # Test for the "even or odd" special case
  ones_digits = ones_places(num + 1)
  offset = ones_digits.length
  total = 0
  until ones_digits.empty?
    digits = ones_digits.pop
    offset -= 1
    matches = matches_in_range(offset, digits)
    total += matches
  end

  total
end

def matches_between(a, b)
  matches_less_than(b) - matches_less_than(a-1)
end
