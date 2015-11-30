require 'colorize'
require 'set'


class Board

  def self.from_file(sudoku_file)
   rows = File.readlines(sudoku_file).map(&:chomp)
   grid = rows.map {|row| row.split("").map(&:to_i)}
   self.new(grid)
  end

  def initialize(grid)
    @grid = grid.map {|row| row.map {|cell| Tile::from_integer(cell) }}
  end

  def [](pos)
    row, col = pos
    @grid[row][col]
  end

  def []=(pos, value)
    row, col = pos
    @grid[row][col] = value
  end

  def row(r)
    (0...9).map {|c| self[[r, c]]}
  end

  def col(c)
    (0...9).map {|r| self[[r, c]]}
  end

  def group(g)
    arr = []
    r, c = g.divmod(3)
    (0...3).each do |row|
      (0...3).each do |col|
        arr << self [[r * 3 + row, c * 3 + col]]
      end
    end
    arr
  end

  def render
    system('clear')
    rows = @grid.map {|row| (row.map {|cell| cell.display}).join(' , ')}
    puts rows.join("\n")
  end

  def valid?(arr)
    values = arr.map{|el| el.value.to_i}.sort == (1..9).to_a
  end

  def solved?
    if not (0...9).all? {|r| valid?(row(r))}
      return false
    elsif not (0...9).all? {|c| valid?(col(c))}
      return false
    elsif not (0...9).all? {|g| valid?(group(g))}
      return false
    else
      return true
    end
  end

end

class Tile
  attr_reader :value, :given
  def self.from_integer(value)
    given = (value != 0)
    value = ' ' if value == 0
    self.new(value, given)
  end

  def initialize(value, given=False)
    @value, @given = value, given
  end

  def color
    given ? :red : :black
  end

  def display
    value.to_s.colorize(color)
  end

  def given?
    @given
  end

  def ==(other)
    other.is_a(Tile) && other.value == value
  end

end

class Game
  attr_reader :board

  def initialize
    @board = Board::from_file('puzzles/sudoku1.txt')
  end

  def prompt
    row, col, value = [-1] * 3

    until valid_pos?(row, col)
      print "Please enter in the row and column you'd like to modify ex: 1,1 :  "
      row, col = gets.chomp.split(",").map {|chr| chr.to_i - 1}
    end

    until value.between?(1, 9)
      print "Please choose the value you wish to enter: "
      value = gets.chomp.to_i
    end

    submit(row, col, value)
  end

  def valid_pos?(row, col)
    if not row.between?(0,8)
      puts "Please enter a row between 1-9"
      return false

    elsif not col.between?(0,8)
      puts "Please enter a column between 1-9"
      return false

    elsif board[[row,col]].given?
      puts "The cell (#{row}, #{col}) is given by the game and cannot be modified"
      return false

    else
      return true

    end
  end

  def play
    "Welcome to sudoku. Good luck!"
    until board.solved?
      board.render
      prompt
    end
    "Congratulations you won!"
  end

  :private

  def submit(row,col,value)
    board[[row,col]] = Tile.new(value, false)
  end

end
