require_relative "dictionary.rb"

class Player
  attr_reader :name

  def initialize (name = "defacto")
    @name = name
  end

  def make_move
    raise "Abstract method was not overridden"
  end

end

class Human < Player

  def make_move (str)
    puts "Current fragment: #{str}"
    print "#{@name}, please choose a letter: ".colorize(:green)
    input = gets.chomp.downcase
  end

end

class AI < Player
  DICT = Dictionary.new
  LETTERS = ("a".."z").to_a

  def make_move (str)
    #Filter bad moves
    range = Set.new(LETTERS)
    makes_valid_words = range.select {|chr| DICT.include?(str+chr)}
    makes_gibberish = range.select {|chr| not DICT.valid_subword?(str+chr)}

    good_choices = (range - makes_valid_words) - makes_gibberish
    if good_choices.size == 0
      x = makes_valid_words.to_a.sample
    else
      x = good_choices.to_a.sample
    end

    puts "(AI) #{name} has chosen #{x}".colorize(:yellow)
    sleep(1)

    x
  end




end
