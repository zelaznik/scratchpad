$choices = ['Rock','Paper','Scissors']
$results = ['Draw',' Win','Lose']
def rps(player_choice)
  player_id = $choices.index(player_choice)
  if player_id == nil
    raise "Invalid choice #{player_choice}"
  end

  computer_id = rand(3)
  diff = (player_id - computer_id) % 3
  result = $results[diff]
  computer_choice = $choices[computer_id]
  "#{computer_choice}, #{result}"
end

def remix(pairs)
  mixers, liquors = [], []
  pairs.each do |mixer, liquor|
  	mixers << mixer
  	liquors << liquor
  end
  liquors.shuffle!

  drinks = []
  liquors.each do |liquor|
  	drinks << [mixers.pop(), liquor]
  end
  drinks.suffle
end

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