require_relative 'tile.rb'

class Board

  DELTAS = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]

  attr_reader :row_count, :col_count, :mine_count

  private

  def set_mines
    mine_locations = (0...(row_count*col_count)).to_a.sample(mine_count)
    mine_locations.each do |location|
      row, col = location.divmod(col_count)
      self[[row,col]] = Tile.new(row, col, true)
    end
    @grid.freeze
  end

  public

  def initialize(row_count = 9, col_count = 9, mine_count = 10)
    @row_count, @col_count, @mine_count = row_count, col_count, mine_count

    @grid = (0...row_count).map {|r| (0...col_count).map {|c| Tile.new(r, c)}}
    set_mines
  end

  def [](pos)
    row, col = pos
    @grid[row][col]
  end

  def render
    @grid.each do |row|
      row.each do |elem|
        print elem.to_s
      end
      puts
    end
  end

  def render_all
    @grid.each do |row|
      row.each do |elem|
        print elem.is_mine
      end
      puts
    end
  end

  def neighbors(row, col)
    arr = []
    DELTAS.each do |dRow, dCol|
      next unless is_valid?(row + dRow, col + dCol)
      arr << self[[row+dRow, col+dCol]]
    end

    arr
  end

  def neighbors_with_mines(row, col)
    mine_count = 0
    neighbors(row,col).each do |tile|
      mine_count += 1 if tile.is_mine
    end

    mine_count
  end

  def is_valid?(row, col)
    row.between?(0, row_count - 1) && col.between?(0, col_count - 1)
  end

  def is_flag?(row, col)
    self[[row,col]].flag_state > 0
  end

  def won?
    not_revealed = 0
    @grid.each do |row|
      row.each do |tile|
        if tile.revealed_mine?
          return false
        elsif !tile.visible?
          not_revealed += 1
          return false if not_revealed > @mine_count
        end

      end # Next tile
    end # Next row

    true
  end

  def lost?
    @grid.any? {|row| row.any? {|tile| tile.revealed_mine?}}
  end

  def over?
    won? || lost?
  end

  def click(row, col)
    tile = self[[row,col]]
    if tile.visible?
      return true
    end

    tile.reveal
    if tile.is_mine?
      return false
    end

    touching = 0
    neighbors(row, col).each do |tile|
      if tile.is_mine?
        touching += 1
      end
    end

    tile.set_touching(touching)

    if touching > 0
      return true
    end

    neighbors(row, col).each do |tile|
      click(tile.row, tile.col)
    end

    true
  end

  private

  def []=(pos, value)
    row, col = pos
    @grid[row][col] = value
  end

end
