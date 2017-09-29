# We'll do this three different ways. Without using a class, using a class with an initialize method and using a class with attr_accessor.

require 'pry'

# WITHOUT A CLASS
# This is reasonably straightforward, but it's not re-usable, and doesn't something's functionality in an object the way classes do.

puts "What is the first strand of nucleotides?"
strand_one = gets.chomp
puts "What is the second strand of nucleotides?"
strand_two = gets.chomp
# Start with an initial 'difference' value of 1
difference = 0
# Turn the first string into an array and then iterate over each element in that array, passing both the element (el) and its index (i) into the block.
strand_one.chars.each_with_index do |el,i|
  if el != strand_two[i]
    difference += 1
  end
end

puts "The hamming distance between #{strand_one} and #{strand_two} is #{difference}."

# USING A CLASS WITH AN INITIALIZE METHOD
# This approach allows us to set the instance variables @strand_one and @strand_two when instantiating a new object of the DNA class, but it (1) requires us to know and pass in those two values when creating the object; (2) does not allow us to get or set those values outside the class itself (to do this, we would need to _also_ add attr_accessors for the values).

class DNA

  # If a class includes an 'initialize' method, this method will be called whenever the .new method is called on the class.
  def initialize(str1, str2)
    # This is a very common pattern - create instance variables from whatever arguments were passed into the Class.new method. Instance variables are available to all methods in the class (eg, hamming_distance, below), which means that the two arguments passed in when we call DNA.new(arg1, arg2) will be set as instance variables @strand_one and @strand_two, which we can use throughout the class.
    @strand_one = str1
    @strand_two = str2
  end

  def hamming_distance
    difference = 0
    @strand_one.chars.each_with_index do |v,i|
      if v != @strand_two[i]
        difference += 1
      end
    end
    puts "The hamming distance between #{@strand_one} and #{@strand_two} is #{difference}"
  end

end

puts "What is the first strand of nucleotides?"
strand_one = gets.chomp
puts "What is the second strand of nucleotides?"
strand_two = gets.chomp

d = DNA.new(strand_one, strand_two)

d.hamming_distance


# USING A CLASS WITH ATTR_ACCESSORS.

# This approach allows us to get and the DNA strands outside the class itself. This approach is necessary if we want to be able to instantiate the object without setting the values at the same time, or set the values after instantiation, or get the values after instantiation.

class Nucleotides

  # Any attributes passed into the attr_accessor method can be accessed and set outside the class itself.
  attr_accessor :strand_one, :strand_two

  def hamming_distance
    difference = 0
    @strand_one.chars.each_with_index do |v,i|
      if v != @strand_two[i]
        difference += 1
      end
    end
    puts "The hamming distance between #{@strand_one} and #{@strand_two} is #{difference}"
  end

end

dna = Nucleotides.new
dna.strand_one = "GATTACA"
dna.strand_two = "GATTAGC"
dna.hamming_distance
