require_relative 'board'

class Game
  attr_reader :board, :red_player, :black_player, :players

  def initialize(red_name, black_name)
    @board = Board.new
    @red_player = Player.new(red_name, :red, @board)
    @black_player = Player.new(black_name, :black, @board)
    @players = [@red_player, @black_player]
  end

  def play
    while true
      @players.first.make_move
      @players.rotate!
    end
  end

end

class Player
  attr_reader :name, :color, :board

  def initialize(name, color, board)
    @name = name
    @color = color
    @board = board
  end

  def make_move
    start_pos, end_pos = board.browse
    board.move(start_pos, end_pos)
  end

end

if __FILE__ == $0
  g = Game.new("Steve", "Darren")
  g.play
end
