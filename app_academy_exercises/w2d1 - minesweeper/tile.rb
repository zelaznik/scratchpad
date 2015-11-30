require 'colorize'

class Tile

  FLAG_STATES = ["*", "F", "?"]
  COLOR_CODE = {1 => :blue, 2 => :green, 3 => :red, 4 => :yellow, 5 => :light_blue, 6 => :light_magenta, 7 => :white, 8 => :light_green}

  attr_reader :flag_state, :touching_mines, :row, :col

  def initialize(row, col, is_mine = false)
    @row, @col, @is_mine = row, col, is_mine

    @flag_state = 0
    @visible = false
    @touching_mines = nil
  end

  def reveal
    @visible = true
  end

  def change_flag
    @flag_state = (@flag_state + 1) % FLAG_STATES.length
  end

  def inspect
    self.class.name + "(row=#{@row}, col=#{@col}, is_mine=#{@is_mine}, flag_state=#{@flag_state}, touching_mines=#{@touching_mines})"
  end

  def to_s
    if not visible?
      return FLAG_STATES[@flag_state]
    elsif is_mine?
      return 'M'
    elsif touching_mines == 0
      return '_'
    else
      color = COLOR_CODE[touching_mines]
      return touching_mines.to_s.colorize(color)
    end
  end

  def set_touching(touching)
    @touching_mines = touching
  end

  def is_mine?
    @is_mine
  end

  def revealed_mine?
    @visible && @is_mine
  end

  def visible?
    @visible
  end

  private

  attr_writer :flag_state

end

if __FILE__ == $0

end
