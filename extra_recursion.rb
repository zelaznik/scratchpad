def gcf(x, y)
  small = [x, y].min
  big = [x, y].max
  if small == 0
    return big
  end

  gcf(big % small, smaller)
end

def sum_recur(array, level = 0)
  if array.length == 1
    return array[0]
  elsif array.length == 0
    return 0
  end

  array[0] + sum_recur(array[1..-1], level+1)
end

def includes?(array, target, level = 0)
  if array.empty?
    return false
  elsif array[0] == target
    return true
  end

  includes?(array[1..-1], target, level + 1)
end

def num_occur(array, target, level = 0)
  if array.empty?
    return 0
  end

  if array[0] == target
    flag = 1
  else
    flag = 0
  end

  flag + num_occur(array[1..-1], target, level + 1)
end

def add_to_twelve(array, level = 0)
  if array.length < 2
    return false
  elsif array[0]+array[1] == 12
    return true
  end

  add_to_twelve(array[1..-1], level + 1)
end

def sorted?(array, level = 0)
  if array.length < 2
    return true
  elsif array[0] > array[1]
    return false
  end

  sorted?(array[1..-1], level + 1)
end

def reverse(string)
  if string.length < 2
    return string
  end

  string[-1] + reverse(string[1...-1]) + string[0]
end