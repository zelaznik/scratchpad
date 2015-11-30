class Board
  attr_reader :size, :ship_count, :grid, :covered
  def initialize(size = 4, ship_count = nil)
    @size = size
    @ship_count = (ship_count == nil ? size : ship_count)
    @targets_left = @ship_count
    reset_grid
    populate_grid
  end

  def view(r, c)
    #displays a cell from the player's perspective
    if @covered[r][c]
      text = '?'
    else
      text = @grid[r][c]
    end
    text.to_s + ' ' * (12 - text.size)
  end

  def display
    #prints the board, with marks on any spaces that have been fired"
    n = @size - 1
    (0..n).each do |r|
      cells = (0..n).map {|c| view(r,c)}
      puts '[' + cells.join(', ') + ']'
    end
  end

  def count
    #returns the number of valid targets remaining"
    @targets_left
  end

  def reset_grid
    @grid = (1..@size).map {|i| [:water] * @size}
    @covered = (1..@size).map {|i| [true] * @size}
  end

  def populate_grid
    #randomly distribute ships across the board"
    remaining_ships = @ship_count
    remaining_numbers = (0..(@size **2 - 1)).to_a
    until remaining_ships == 0
      remaining_numbers.shuffle!
      x = remaining_numbers.pop()
      r, c = x.divmod(@size)
      @grid[r][c] = :ship
      remaining_ships -= 1
    end
  end

  def in_range?(pos)
    r, c = pos
    @grid[r][c] == :ship
  end

  def process(pos)
    r,c = pos
    @covered[r][c] = false
    if in_range?(pos)
      @grid[r][c] = :destroyed
      @targets_left -= 1
      return true
    else
      return false
    end
  end

end

class HumanPlayer
  def get_guess
    valid_input = false
    until valid_input
      print "Please make a guess in the form row, col: "
      text = gets.chomp
      if ['quit','exit'].include?(text.downcase)
        raise "Aborted by user"
      end
      input = text.split(', ')
      r, c = input.map {|x| x.to_i}
      if r == 0 || c == 0
        puts "Invalid input: #{text}"
      else
        valid_input = true
      end
    end
    #Switch from 1 to 0 based indexes
    return [r - 1, c - 1]
  end
end

class Game
  def initialize(size = 4, ship_count = nil)
    @board = Board.new(size, ship_count)
    @player = HumanPlayer.new
    @turns = 0
  end

  def play
    #runs the game by calling play_turn until the game is over"
    until @board.count == 0
      play_turn
      display_status
    end
    puts "You won!"
  end

  def play_turn
    #gets a guess from the player and makes an attack"
    valid_input = false
    until valid_input
      r, c = @player.get_guess
      if @board.covered[r][c]
        valid_input = true
      else
        puts "You have already selected the cell (#{r+1}, #{c+1})."
      end
    end
    attack([r,c])
    @turns += 1
  end

  def attack(pos)
    #marks the board at 'pos' destroying or replacing any ship that might be there"
    r, c = pos
    if @board.process(pos)
      puts "Attack on (#{r + 1}, #{c + 1}) sucessfull!"
    else
      puts "Attack on (#{r + 1}, #{c + 1}) failed."
    end
  end

  def display_status
    #prints the information on the current state of the game, including board state, and the number of ships remaining"
    puts ""
    puts "#{@turns} turns so far"
    puts "#{@board.count} ships remaining" 
    puts "Current board: "
    @board.display
  end
end