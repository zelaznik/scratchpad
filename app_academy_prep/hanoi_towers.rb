class Towers


end


def towers_of_hanoi
  print "Please select a number of discs: "
  difficulty = gets.to_i
  
  source = (1..difficulty).to_a.reverse
  target = []
  helper = []
  towers = {1 =>source, 2 => target, 3 => helper}
  
  count = 0
  while true
    count += 1
    
    puts ""
    puts "Round #{count}"
    puts "source(1) == #{source}"
    puts "target(2) == #{target}"
    puts "helper(3) == #{helper}"
    puts ""
    
    print "Do you want to quit? (y / n) "
    answer = gets.chomp
    if answer == "y"
      break
    end
    
    choices = {"from" => nil, "to" => nil}
    
    choices.each do |key, value|
      4.times do |i|
        puts "Which tower would you like to move #{key}"
        print "1 (source) / 2 (target) / 3 (helper): "
        choice = gets.to_i
        if not towers.include?(choice)
          puts "invalid entry: #{choice}"
        else
          choices[key] = choice
          break
        end
      end
      if choices[key] == nil
        raise "Maximum attempts reached."
      end
    end

    from_tower = towers[choices["from"]]
    to_tower = towers[choices["to"]]
    
    if from_tower.empty?
      puts "Cannot select from empty tower.  You lose your turn \n\n" 
      next
    elsif (not to_tower.empty?) and from_tower[-1] > to_tower[-1]
      puts "Cannot place larger disc on smaller disc. \n\n"
      next
    else
      to_tower << from_tower.pop()
    end
    
  
    if target.count == difficulty
      "You won!"
      break
    end

  end
  
end

towers_of_hanoi