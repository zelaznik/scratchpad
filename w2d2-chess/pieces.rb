require 'byebug'

class AbstractPiece
  attr_reader :board, :row, :col

  def initialize(board, row, col)
    @board, @row, @col = board, row, col
  end

  def available_moves
    raise NotImplementedError
  end

  def symbol
    raise NotImplementedError
  end

  def teammate?(color)
    raise NotImplementedError
  end

  def to_s
    symbol
  end

  def inspect
    self.class.name + "(row=#{row}, col=#{col})"
  end

end

class EmptySquare < AbstractPiece
  def available_moves
    []
  end

  def symbol
    "   "
  end

  def teammate?(color)
    false
  end

end

class Piece < AbstractPiece
  attr_reader :color

  def initialize(board, row, col, color)
    super(board, row, col)
    @color = color
  end

  def teammate?(color)
    color == self.color
  end

  def position
    raise NotImplementedError
  end

  def symbol
    raise NotImplementedError
  end

  def directions
    raise NotImplementedError
  end

  def magnitudes
    raise NotImplementedError
  end

  def inspect
    self.class.name + "(row=#{row}, col=#{col}, color=#{color})"
  end

  def available_moves
    possible_moves = []
    directions.each do |unit_row, unit_col|
      magnitudes.each do |scalar|
        new_row = row + unit_row * scalar
        new_col = col + unit_col * scalar
        #byebug
        break if obstacle?(new_row, new_col)
        possible_moves << [new_row, new_col]
      end #Next magnitude
    end #Next direction

    possible_moves
  end

  def obstacle?(row, col)
    (!board.in_range?(row, col)) || board[row, col].teammate?(color)
  end

end

def diagonal_directions
  [[-1,1],[-1,-1],[1,-1],[1,1]]
end

def row_col_directions
  [[0,1],[0,-1],[1,0],[-1,0]]
end

module MAGNITUDE_UNLIMITED
  def magnitudes
    (1...8).to_a
  end
end

module MAGNITUDE_ONE
  def magnitudes
    [1]
  end
end

module DIAGONAL_MOVES
  def directions
    diagonal_directions
  end
end

module ROW_COL_MOVES
  def directions
    row_col_directions
  end
end

module UNLIMITED_MOVES
  def directions
    row_col_directions + diagonal_directions
  end
end

class Bishop < Piece
  include DIAGONAL_MOVES
  include MAGNITUDE_UNLIMITED

  def symbol
    " B ".colorize(color)
  end

end

class Pawn < Piece
  DIRECTION = {:red => 1, :black =>-1}.freeze

  def initialize(board, row, col, color)
    super(board, row, col, color)
    @moved = false
  end

  def moved
    raise NotImplementedError
  end

  def symbol
    " P ".colorize(color)
  end

  def available_moves
    []
  end

end

class Rook < Piece
  include ROW_COL_MOVES
  include MAGNITUDE_UNLIMITED

  def symbol
    " R ".colorize(color)
  end

  def moved
    raise NotImplementedError
  end

end

class Knight < Piece
  include MAGNITUDE_ONE

  def symbol
    " N ".colorize(color)
  end

  def directions
    [[-1,-2],[-2,-1],[1,-2],[-2,1],[-1,2],[2,-1],[1,2],[2,1]]
  end

end

class Queen < Piece
  include UNLIMITED_MOVES
  include MAGNITUDE_UNLIMITED

  def symbol
    " Q ".colorize(color)
  end

end

class King < Piece
  include UNLIMITED_MOVES
  include MAGNITUDE_ONE

  def symbol
    " K ".colorize(color)
  end

  def moved
    raise NotImplementedError
  end

end
