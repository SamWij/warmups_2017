# Creating global variables in Ruby isn't as trivial a matter as it is in JavaScript. So how can we store a hash of the values outside of our score method without declaring the hash inside the score method itself? One way is to store the hash inside a method. Leveraging Ruby's implicit return, if we just dump a hash inside a method, calling that method will return the hash.
def values
  {
    # Below I'm using something called % notation to create my arrays. %w means "create an array of strings from everything between these two delimiters ({}), where whitespace signals the end of one element and the start of another". %w{A B C} is the same as the string literal notation ["A", "B", "C"]
    1 => %w{A E I O U L N R S T},
    2 => %w{D G},
    3 => %w{B C M P},
    4 => %w{F H V W Y},
    5 => %w{K},
    8 => %w{J X},
    10 => %w{Q Z}
  }
end

# This randomize method takes a single argument. I'm putting this in a method so that I can re-use it for both letter and word scores, and both double and triple scores.
def randomize(value)
  random = Random.rand(10)
  if random < 3
    value *= 2
  elsif random > 9
    value *= 3
  end
  # Return the value
  value
end


def score(word)
  # Start out with a sum of zero. We'll increment this by the value of the tile on each iteration
  sum = 0
  # Take the word passed into the method, convert it to uppercase (so we can easily compare it with the arrays in our values hash), split the characters of the word into an array (this is the same as .split(""), and then iterate over each letter in the resulting array...)
  word.upcase.chars.each do |letter|
    # Then, for each letter, we need to iterate over all the key value pairs in our values hash and...
    values.each do |k,v|
      # If the value (an array) of the key:value pair includes the letter...
      if v.include?(letter)
        # ... pass the key of that array to the randomize method, which will return a value (either the value itself, or 2 times the value, or 3 times the value, for the random double/triple letter scores)
        sum += randomize(k)
      end
    end
  end
  # Instead of just returning the sum, take the sum and pass it to the randomize method (for the double/triple word score.)
  randomize(sum)
end

# Print a prompt to the terminal
puts "What word do you want to play?"

# Get input from the user, 'chomp' the return character from the end and store it in a variable called 'input'
input = gets.chomp

# Call the score method, passing the input variable, and print whatever that returns to the terminal.
puts score(input)
