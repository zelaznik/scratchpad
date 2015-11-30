class Board 
  attr_reader :grid
  def initialize
    @grid = [[nil]*3,[nil]*3,[nil]*3]
  end
  
  def row(i)
    vector = {}
    @grid[i].each_with_index do |cell, j|
      vector[[i,j]] = cell
    end
    vector
  end
  
  def rows
    [row(0),row(1),row(2)]
  end
  
  def column(j)
    vector = {}
    @grid.each_with_index do |row, i|
      vector[[i,j]] = row[j]
    end
    vector
  end
  
  def columns
    [column(0),column(1),column(2)]
  end
  
  def diagonal(k)
    if k == 0
      coordinates = [[0,0],[1,1],[2,2]]
    else
      coordinates = [[0,2],[1,1],[2,0]]
    end
    
    vector = {}
    
    coordinates.each do |i, j|
      vector[[i,j]] = @grid[i][j]
    end
    
    vector
  end
  
  def diagonals
    [diagonal(0),diagonal(1)]
  end
  
  def display
    puts "Board:"
    @grid.each do |row|
      puts "  #{row.to_s}"
    end
  end
  
  def possibilities
    rows + columns  + diagonals
  end
  
  def winner
    possibilities.each do |vector|
      return vector.values[0] if won?(vector)
    end
    return nil
  end
  
  def won?(vector)
    values = vector.values
    values.uniq.count == 1 && values[0] != nil
  end
  
  def draw?
    @grid.none? {|row| row.any? {|pos| pos == nil}} && !winner
  end
end

class Game
  def initialize
    @board = Board.new
    @player_x = Human.new(:x, @board)
    @player_o = Computer.new(:o, @board)
  end
  
  def play
    9.times do |i|
      [@player_x, @player_o].each do |player|
        turn(player)
        winner = @board.winner
        if winner != nil 
          symbol = @board.winner
          puts "Player " + winner.to_s + " has won."
          return
        end
        
        if @board.draw?
          puts "Its a draw!"
          return
        end
      end
    end
  end
  
  def turn(player)
    puts "Turn for player: #{player.symbol}"
    row, col = player.turn
    @board.grid[row][col] = player.symbol
    @board.display
  end

end

class Player
  attr_reader :symbol
  def initialize(symbol, board)
    @symbol = symbol
    @board = board
  end

  def turn
    raise "NotImplemented"
  end
end

class Human < Player
  def turn
    valid_entry = false
    until valid_entry
      print "Enter coordinates (row, col): "
      begin
        row, col = gets.chomp.split(", ")
        raise "error" unless %{1 2 3}.include?(row)
        raise "error" unless %{1 2 3}.include?(col)
        row, col = [row.to_i - 1, col.to_i - 1]
      rescue
        puts "Invalid entry."
        next
      end
      
      if @board.grid[row][col].nil?
        pos = [row, col]
        valid_entry = true
      else
        puts "Invalid spot"
      end
    end
    
    pos
  end
end

class Computer < Player
  
  def random_spot
    blank_found = false
    while !blank_found
      x = rand(3)
      y = rand(3)
      if @board.grid[x][y] == nil
        blank_found = true
        return [x,y]
      end
    end
  end
  
  def check(vector)
    count = 0
    blank_spot = nil
    vector.each do |pos, mark|
      if mark == @symbol
        count += 1
      elsif mark == nil
        blank_spot = pos
      end
    end
    if count == 2
      return blank_spot
    else
      return nil
    end
  end
  
  def turn
    @board.possibilities.each do |vector|
      pos = check(vector)
      return pos if pos != nil
    end
    return random_spot
  end
end

g = Game.new
g.play
