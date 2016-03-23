require 'set'

def factor(num)
  factors = []
  (2..(num/2)).each do |x|
    factors << x if num % x == 0
  end
  factors
end

def flip(arr, x, y)
  temp = arr[x]
  arr[x] = arr[y]
  arr[y] = temp
  return arr
end

def bubblesort(arr)
  arr = arr[0..-1]
  is_sorted = false
  n = arr.length - 1
  until is_sorted
    is_sorted = true
    (1..n).each do |i|
      if arr[i-1] > arr[i]
        flip(arr, i-1, i)
        is_sorted = false
      end
    end
  end
  arr
end

def substrings(text)
  chunks = Set.new
  n = text.length - 1
  (0..n).each do |first|
    (first..n).each do |last|
      substring = text[first..last]
      chunks.add(substring.downcase)
    end
  end
  chunks.keys
end

$dct = Set.new
file_path = '/Users/zMac/Desktop/dictionary.txt'
all_words = open(file_path).read.split
all_words = all_words.map {|x| x.downcase}
$dct.merge(all_words)

def subwords(text)
  chunks = substrings(text)
  chunks.select {|c| $dct.include?(c)}
end

def super_print(text, options={})
  text = text.upcase  if options[:upcase]  == true
  text = text.reverse if options[:reverse] == true

  if options.include?(:times)
    count = options[:times]
  else
    count = 1
  end

  count.times do |i|
    puts text
  end

end

