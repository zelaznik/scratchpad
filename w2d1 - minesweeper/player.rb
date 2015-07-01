class Player
  def get_yes_no(message)
    4.times do
      print message
      case gets.chomp.downcase
      when 'y'
        return true
      when 'n'
        return false
      else
        puts "Please enter a 'y' or 'n'."
      end
    end
  end

  def get_input
    print "please enter a row: "
    row = gets.chomp.to_i
    print "please enter a column: "
    col = gets.chomp.to_i
    flag = get_yes_no("Do you want to place a flag (y/n)? ")

    [row, col, flag]
  end

  def ask_save
    get_yes_no("do you want to save? (y/n) ")
  end

end
