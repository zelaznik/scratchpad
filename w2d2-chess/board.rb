require 'colorize'
require_relative 'cursor'
require_relative 'pieces'

class Board
  ROW_CT = 8
  COL_CT = 8

  DISPLAY = {:red => :white, :black => :green}

  def add_commoners(color, flip)
    #Adds all of the pieces except the queen and king

    if flip
      pos = Proc.new {|r,c| [-(r+1),-(c+1)]}
    else
      pos = Proc.new {|r,c| [r,c]}
    end

    # add_pawns
    (0...COL_CT).each do |c|
      row, col = pos.call(1,c)
      self[row, col] = Pawn.new(self, row, col, color)
    end

    #add bishops
    [[0,2], [0,5]].each do |r, c|
      row, col = pos.call(r, c)
      self[row, col] = Bishop.new(self, row, col, color)
    end

    #add knights
    [[0,1],[0,6]].each do |r, c|
      row, col = pos.call(r,c)
      self[row, col] = Knight.new(self, row, col, color)
    end

    #add rooks
    [[0,0], [0,7]].each do |r, c|
      row, col = pos.call(r, c)
      self[row, col] = Rook.new(self, row, col, color)
    end

  end

  def add_royalty
    self[0, 3] = Queen.new(self, 0, 3, DISPLAY[:black])
    self[0, 4] = King.new(self,  0, 4, DISPLAY[:black])
    self[7, 3] = Queen.new(self, 7, 3, DISPLAY[:red])
    self[7, 4] = King.new(self,  7, 4, DISPLAY[:red])
  end

  def initialize
    @cursor = Cursor.new(self, ROW_CT-1, 0)

    @grid = (0...ROW_CT).map {|r| (0...COL_CT).map {|c| EmptySquare.new(self, r, c)}}
    add_commoners(DISPLAY[:black], false)
    add_commoners(DISPLAY[:red], true)
    add_royalty
  end

  def render
    system('clear')
    grid.each_with_index do |row, r|
      string = ""
      row.each_with_index do |square, c|
        string << square.to_s.colorize(:background=> color(r,c))
      end
      puts string
    end
  end

  def in_range?(row, col)
    (row.between?(0, ROW_CT - 1) && col.between?(0, COL_CT - 1))
  end

  def move(start_pos, end_pos)
    self[*end_pos] = self[*start_pos]
    self[*start_pos] = EmptySquare.new(self, *start_pos)
  end

  attr_reader :grid, :cursor

  def [](row, col)
    @grid[row][col]
  end

  def []=(row, col, value)
    @grid[row][col] = value
  end

  def color(row, col)
    if cursor.pending_pos?(row, col)
      :yellow
    elsif cursor.current_pos?(row, col)
      :yellow
    elsif self[row, col].available_moves.include?([row, col])
      :blue
    elsif (row+col).even?
      :red
    else
      :black
    end
  end

  def browse
    @cursor.browse
  end

end

if __FILE__ == $0
  b = Board.new
  b.browse
  end
