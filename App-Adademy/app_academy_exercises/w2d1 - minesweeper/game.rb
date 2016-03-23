require_relative "player.rb"
require_relative "board.rb"
require "yaml"

class Game

  def initialize(player, rows = 9, cols = 9, mines = 10)
    @player = player
    @board = Board.new(rows, cols, mines)
    play
  end

  def [](pos)
    row, col = pos
  end

  def over?
    board.over?
  end

  def lost?
    board.lost?
  end

  def won?
    board.won?
  end

  def render
    system('clear')
    board.render
  end

  def render_all
    board.render_all
  end

  def self.from_yaml(src_path)
    src_file = File.open(src_path)
    game = YAML::load(src_file)
    game.play
  end

  def play
    begin
      until over?
        turn
      end
      if won?
        puts "you won"
      else
        puts "you lost"
      end
      render_all

    rescue Interrupt
      puts
      save_flag = player.ask_save
      if save_flag
        save
        return
      else
        raise
      end
    end
  end

  def save
    File.open("minesweeper.yml", "w") {|file| file.write(self.to_yaml)}
  end

  def is_valid?(row, col)
    board.is_valid?(row, col)
  end

  def turn
    render
    row, col, flag = player.get_input

    unless is_valid?(row, col)
      puts "invalid input"
      return
    end

    if flag
      board[[row,col]].change_flag
      return
    elsif board.is_flag?(row, col)
      puts "Cannot click on a flag."
      return
    else
      board.click(row,col)
    end

  end

  private

  attr_reader :board, :player

end

game = Game.from_yaml("minesweeper.yml")
