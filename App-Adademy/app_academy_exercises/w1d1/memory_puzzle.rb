require "byebug"
class Card
  attr_reader :value, :face_up

  VALUES = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']

  #Two bits of info, face up or face down
  def initialize(value, face_up=false)
    @value = value
    @face_up = face_up
  end

  def face_up?
    @face_up
  end

  def reveal
    @face_up = true
  end

  def hide
    @face_up = false
  end

  def display
    @face_up ? @value.to_s : '?'
  end

  def ==(other)
    @value == other.value
  end
  
  def inspect
    "Card(value=#@value, face_up=#@face_up)"
  end

  def to_s
    display
  end

end

class Board
  #Grid instance of variables
  attr_reader :grid

  def initialize
    @grid = Array.new(4){Array.new(4)}
  end

  def populate
    values = (Card::VALUES.sample(8) * 2).shuffle
    # p values
    values.each_with_index do |value, i|
      row, col = i.divmod(4)
      @grid[row][col] = Card.new(value, false)
    end
    # p grid.map { |row| row.map(&:value) }
  end

  def render
    #Print a representation of the board's current state
    arr = []
    @grid.each do |row|
      arr << row.join(", ")
    end
    puts arr.join("\n")
  end

  def won?
    @grid.all? { |row| row.all? { |card| card.face_up? } }
  end

  def reveal(row, col)
    @grid[row][col].reveal
  end

  def hide(row, col)
    @grid[row][col].hide
  end

end

class Game
  attr_reader :board

  def initialize
    @board = Board.new
    @board.populate
    @turn_ct = 0
  end

  def read_guess(order)
    valid_guess = false
    until valid_guess
      print "Please select your #{order} card (row, col): "
      input = gets.chomp
      puts "input == #{input}"

      begin
        row, col = input.split(',').map {|x| x.to_i}
        [row,col].each do |dim|
          if dim > 4 || dim < 1
            raise "Inputs out of range"
          else
            valid_guess = true
          end
        end

      rescue
        puts "Invalid input: #{input}"

      end

    end

    [row - 1, col - 1]
  end

  def turn
    @turn_ct += 1
    puts "Turn #{@turn_ct}:"
    @board.render

    row1, col1 = read_guess('first')
    @board.reveal(row1, col1)
    @board.render

    row2, col2 = read_guess('second')
    @board.reveal(row2, col2)
    @board.render

    if @board.grid[row1][col1] != @board.grid[row2][col2]
      sleep(5)
      @board.hide(row1, col1)
      @board.hide(row2, col2)
    end

    system('clear')

  end

  def play
    until @board.won?
      turn
    end
  end

end

g = Game.new
g.play