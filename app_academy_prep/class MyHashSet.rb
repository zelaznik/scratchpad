class MyHashSet
  def initialize(keys = [])
   dct = {}
   keys.each do |key|
     dct[key] = key
   end
    @store = dct
  end

  def insert(key)
    @store[key] = key
  end

  def delete(key)
    was_included = self.include?(key)
    @store.delete(key)
    return was_included
  end

  def to_a
    @store.keys
  end

  def to_s
    "#{self.class.name}(#{self.to_a.to_s})"
  end
  
  def inspect
    self.to_s
  end

  def each
    @store.each { |key, value| yield key }
  end

  def include?(key)
    @store.include?(key)
  end

  def union(other)
    full = {}
    other.each do |item|
      full[item] = item
    end
    self.each do |item|
      full[item] = item
    end
    self.class.new(full.keys)
  end

  def intersection(other)
    inner = []
    other.each do |item|
      if self.include?(item)
        inner << item
      end
    end
    self.class.new(inner)
  end

  def minus(other)
    left = []
    self.each do |item|
      if not other.include?(item)
        left << item
      end
    end
    self.class.new(left)
  end

end

x = MyHashSet.new([2,4,6,8,10,12])
y = MyHashSet.new([3,6,9,12,15])

puts "x.union(y)        == #{x.union(y)}"
puts "y.union(x)        == #{y.union(x)}"

puts "x.intersection(y) == #{x.intersection(y)}"
puts "y.intersection(x) == #{y.intersection(x)}"

puts "x.minus(y)        == #{x.minus(y)}"
puts "y.minus(x)        == #{y.minus(x)}"