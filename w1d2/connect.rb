class Board
  attr_reader :row_ct, :col_ct
  def initialize(row_ct = 6, col_ct = 7)
    @row_ct, @col_ct = row_ct, col_ct
    @grid = (0...col_ct).map {|col| (0...row_ct).map {|row| [col, row]}}
    #@grid = Array.new(col_ct) {[nil]*row_ct}
  end

  def drop_disc(column, disc)
    i = col(column).index(nil)
    self[column, i] = disc
  end

  def col(c)
    @grid[c]
  end

  def row(r)
    @grid.map {|col| col[r]}
  end

  def diag(c0, r0, col_slope, row_slope)
    n = [col_ct, row_ct].min
    (0...n).map {|i| self[c0+col_slope*i, r0+row_slope*i]}
  end

  def all_rows
    (0...row_ct).map {|r| row(r)}
  end

  def all_columns
    (0...col_ct).map {|c| col(c)}
  end

  def all_diagonals
    arr = []
    # Diagonals from column 0
    (0...row_ct).each do |r|
      arr << diag(0, r, 1, 1)
    end

    # Col-increasing diagonals from row 0
    (0...col_ct).each do |c|
      arr << diag(c, 0, 1, 1)
    end

    # Col-decreasing diagonals from row 0
    (0...col_ct).each do |c|
      arr << diag(c, 0, -1, 1)
    end

    #Up-left diagonals from column -1
    (0...row_ct).each do |r|
      arr << diag(col_ct - 1, r, -1, 1)
    end

    arr

  end

  def valid?(arr)
    consecutive_count = 0
    previous_char = nil
    arr.each do |char|
      if not char.nil?
        consecutive_count = 0
      elsif  char == previous_char
        consecutive_count +=1
      end
      if consecutive_count == 4
        return previous_char
      end
      previous_char = char
    end
    nil
  end

  private

  def [](row, col)
    begin
      return @grid[row][col]
    rescue NoMethodError
      return nil
    end
  end

  def []=(row, col, value)
    @grid[row][col] = value
  end

end
