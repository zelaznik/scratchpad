$power = ['','thousand','million','billion','trillion']
$ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
$teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
$tens = ['', nil, 'twenty', 'thirty', 'forty', 'fifty', 'sixty','seventy','eighty','ninety']

def below_hundred(x)
  q, r = x.divmod(10)
  if q == 0
    return $ones[r]
  elsif q == 1
    return $teens[r]
  else
    if r == 0
      return $tens[q]
    else
      return $tens[q] + ' ' + $ones[r]
    end
  end
end

def below_thousand(x)
    q, r = x.divmod(100)
    if q == 0
      return below_hundred(r)
    else
      if r == 0
        return $ones[q] + ' hundred'
      else
        return $ones[q] + ' hundred ' + below_hundred(r)
      end
    end
end

def blah(x)
    if x >= 10**15
      raise "number must be less than one quadrillion"
    elsif x == 0
      return 'zero'
    end
    
    arr = []
    q = x
    while q != 0 do
      q, r = q.divmod(1000)
      arr << r
    end
    
    word = ''
    p = 0
    arr.each do |rem|
        word = below_thousand(rem) + ' ' + $power[p] + ' ' + word
        p += 1
    end
    return word.strip
end

tests = [314159265, 525600, 1001, 8675309, 15, 9]

tests.each do |test|
  puts "#{test} == #{blah(test)}"
end

#(0..299).each do |x|
#    puts "#{x} == '#{below_thousand(x)}'"
#end


