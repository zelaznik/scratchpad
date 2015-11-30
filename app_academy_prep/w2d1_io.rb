def guess(n=100)
  answer = rand(n)
  print "Please enter your first guess: "
  guess = gets.chomp.to_i
  attempts = 1
  until answer == guess
    if guess > answer
      puts "Your guess is too high"
    else
      puts "Your guess is too low"
    end
      print "Please guess again: "
      guess = gets.chomp.to_i
      attempts += 1
    end
  puts "Congratulations.  You found the right number, #{answer}, in #{attempts} tries."
end
