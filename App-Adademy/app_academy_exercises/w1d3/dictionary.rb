class Dictionary < Array
  def initialize(path = 'ghost-dictionary.txt')
    File.readlines(path).each do |word|
      self << word.chomp.downcase
    end
    self.sort!
  end

  def valid_subword?(subword)
    self.each do |word|
      return true if word.start_with?(subword)
    end

    false
  end

end
