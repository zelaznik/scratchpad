def xpascal(level)
  return Enumerator.new { |y| } if level < 0

  Enumerator.new do |y|
    left = 0
    xpascal(level - 1).each do |right|
      y << (left + right)
      left = right
    end
    y << 1
  end
end

def pascal(level)
  xpascal(level).to_a
end

def generator(&block)
  
end
