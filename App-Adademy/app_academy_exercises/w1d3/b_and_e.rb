class Keypad

  def initialize (length = 4, mode_keys = [1, 2, 3])
    @code_length = length
    @mode_keys = mode_keys
    @key_history = []
    code_bank_populate
  end

  def press (input)
    key_history << input
    if (key_history.length > code_length) && mode_keys.include?(input)
      attempt = key_history[-(code_length+1) ...-1]
      code_bank.delete(attempt)
    end
  end

  def all_codes_entered?
    code_bank.size == 0
  end

  private

  attr_reader :code_length, :key_history, :mode_keys
  attr_accessor :code_bank

  def code_bank_populate
    permutations = (0...3).to_a.repeated_permutation(code_length)
    @code_bank = Set.new(permutations)
  end



end
