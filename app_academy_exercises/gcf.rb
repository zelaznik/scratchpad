def gcf(x, y)
  small = [x, y].min
  big = [x, y].max
  if small == 0
    return big
  end

  gcf(big % small, smaller)
end

