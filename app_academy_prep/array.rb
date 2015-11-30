class Array

  def my_uniq
    self.uniq
  end

  def two_sum(arr)
    pairs = []
    xMax = arr.count - 2
    yMax = arr.count - 1
    (0..xMax).each do |x|
      ((x+1)..yMax).each do |y|
        if arr[x] + arr[y] == 0
          pairs << [x,y]
	    end
	  end
     end
     return pairs
  end

end

def my_transpose(arr)
  row_ct = arr.count
  col_ct = arr[0].count
  (0..row_ct).each do |i|
    if arr[i].count != col_ct
      raise "Inconsistent matrix shape"
    end
  end
  
  xpose = []
  for 