def raindrops(number)
  str = ""

  # If the number contains 3 as a factor, output 'Pling'
  # if number % 3 == 0
  #   str += "Pling"
  # end
  str << "Pling" if number % 3 == 0

  # # If the number contains 5 as a factor, output 'Plang'.
  # if number % 5 == 0
  #   str += "Plang"
  # end
  str << "Plang" if number % 5 == 0

  #  # If the number contains 7 as a factor, output 'Plong'.
  # if number % 7 == 0
  #   str += "Plong"
  # end
  str << "Plong" if number % 7 == 0


  # if str.empty?
  #   return number
  # else
  #   return str
  # end

 # If the number does not contain 3, 5, or 7 as a factor, simply return the string representation of the number itself.
 return str unless str.empty?
 number.to_s

end

puts "What number do you want to convert?"

num = gets.to_i
puts raindrops(num)
