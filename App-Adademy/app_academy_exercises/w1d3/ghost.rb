require 'set'
require_relative 'ghost-player.rb'
require_relative 'dictionary.rb'
require 'colorize'

class Game
  GHOST = "GHOST"

  DICT = Dictionary.new

  def initialize (*players)
    unless players.map(&:name).uniq.size == players.each(&:name).size
      raise "Player names must be unique."
    end

    @players = players.shuffle
    @scores = {}
    players.each { |player| @scores[player.name.to_sym] = 0 }
  end

  def play
    until end_game?
      single_round
      @scores[current_player.name.to_sym] += 1
      print_score
    end
  end

  private

  def clear_board
    @fragment = ""
    @chr = ""
  end

  def print_score
    puts "Current score:"
    @scores.each do |name, score|
      puts "   #{name}:".colorize(:blue) + " #{GHOST[0...score]}"
    end
  end

  def end_game?
    @scores.any? {|name, score| score >= GHOST.size}
  end

  def single_round
    #Loop
    clear_board
    round_over = false
    until round_over
      rotate_players
      round_over = play_round
      commit
    end
  end

  def get_next_move
      chr = current_player.make_move(fragment).downcase
      until chr.size == 1 && chr.between?("a","z")
        puts "Invalid input: Please select a single character between a-z.".colorize(:yellow)
        chr = current_player.make_move(fragment)
      end

      chr
  end

  def play_round
    #Loop through each player
    @chr = get_next_move
    case play_analysis
      when :invalid
        puts "#{current_player.name} loses: '#{pending}' is not a valid subword.".colorize(:red)
        return true
      when :complete
        puts "#{current_player.name} loses: '#{pending}' is a complete word.".colorize(:red)
        return true
      when :partial
        return false
      else
        raise "Invalid case: #{play_analysis}"
    end
  end

  def play_analysis
    if complete_word?
      return :complete
    elsif valid_subword?
      return :partial
    else
      return :invalid
    end
  end

  def valid_subword?
    DICT.valid_subword?(pending)
  end

  def complete_word?
    DICT.include?(pending)
  end

  def fragment
    @fragment + ""
  end

  def pending
    @fragment + @chr.downcase
  end

  def commit
    @fragment << @chr.downcase
    @chr = ""
  end

  def current_player
    @players[0]
  end

  def prev_player
    @players[-1]
  end

  def rotate_players
    @players.rotate!
  end

end

if __FILE__ == $0
  g = Game.new(Human.new("Elton"),Human.new("Steve"))
  g.play
end
