require 'pry'
class Atbash

  # Create an initialize method. This will be called whenever the .new  method is called on the Atbash class.
  # Since I want to pass in a word to be en/coded when I instantiate a new Atbash object, my initialize method also needs to accept an argument (whatever gets passed in when I call Atbash.new()).
  def initialize(word)
    # My initialize method is going to set up all the instance variables I'll need in my encode method.
    @word = word.downcase
    # Create a new range of all the characters between "a" to "z" and then convert that to an array.
    @alphabet = ("a".."z").to_a
    # Create another array that is just the reverse alphabet array.
    @reverse = @alphabet.reverse
  end

  def encode
    # Start off with an empty string. I'm going to use the += string concatenation method to add encoded characters to this result.
    message = []
    # There is no String.each method in Ruby. If I want to iterate over all the characters in a string, I need to call a method on the string that will return an array. I can do this a few ways...
    # Method 1 - split & each - call the each method on the array returned by calling the String.split method on a string.
    # @word.split("").each do |c|
    # Method 2 - chars & each - call the each method on the array returned by calling the String.chars method on a string.
    # @word.chars.each do |c|
    # Method 3 - this is a pretty common pattern, so Ruby has a helper method that does this in one step. String.each_char splits a string into an array and iterates over each element in that array.
    @word.each_char do |c|
      # Let each letter be 'c' and get the index of that character in the alphabet
      i = @alphabet.index(c)
      # Get the character at the i'th element of the reversed alphabet
      cipher_character = @reverse[i]
      # Add that character to the end of the message. (Could also have used the append operator << , which works on both strings and arrays.)
      message << cipher_character
    end
    message
  end

end

puts "What's the word you want to encode?"

word = gets.chomp
cipher = Atbash.new(word)
puts cipher.encode
