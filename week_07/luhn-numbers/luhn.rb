class Luhn
    def initialize(number)
        @number = number
    end

    def luhnify
        numbers = []
        # We want to work from the right (since we want to double every second digit from the RIGHTMOST digit passed in), but there is no .reverse method for numbers. So let's start with this...
            # @number = @number.to_s.reverse
        # ... but we really want this as an array, so we can work with each element (and its index) individually. So let's add this...
            # @number = @number.split('')
        # ... but we want to by able to multiply every second digit by two. The problem is, if we call the :* method on a string, it returns a string with the 'digit' repeated x times  - eg "5"*3 = "555". So we need to convert EACH element back to an integer, like this:
            # @number = @number.map(&:to_i)
        # Now we want to iterate over the resulting array and, starting from the checksum (which is now the 0th number in the array, because we reversed the numbers earlier). We also want the index of the element, because that's what determines whether the digit should be multiplied by two or not, so we'll use each_with_index.
            # @number.each_with_index do |digit, index|
                # # our_code_here
            # end

        # Lets condense all that code into one line:
        @number.to_s.reverse.split('').map(&:to_i).each_with_index do |digit, index|
            # We want to multiply every second digit by two. We can call the .even? method on the index to determine whether the digit should be multiplied by two.
            # if index.even?
            #     value = digit
            # else
            #     value = digit * 2
            # end

            # Here's a cleaner version of that conditional using a ternary.
            value = index.even? ? digit : digit * 2

            # If the resulting value is > 9, subtract 9 from that value.
            # if value > 9
            #     value = value - 9
            # end

            # Here's a cleaner version of that conditional
            value -= 9 if value > 9
            numbers << value
        end
        numbers.reverse
    end

    def valid
        # .inject is an enumerable method that takes (up to) two arguments. If we pass in two arguments, the first is the initial value of something called the 'memo', the second is the method we want to call on memo, passing in each element in the enumerable, and returning a new value for 'memo' each time. It will go through each element in the enumerable, take the 'memo' (which, in the example below, is initally 0) and call the method in the second arugment on the memo (which in the example below is the addition method), passing in the current element from the enumerable, and return that as the 'memo'. The method will then be called on the NEW memo, passing in the second element in the enumerable, returning a NEW NEW memo. etc.

        checksum = luhnify.inject(0, :+)

        # The verbose form of .inject shows what is going on a bit more clearly:
        # [1,2,3,4,5].inject(0) do |sum, num|
            # sum + num
        # end
        #   # => 10
        # ie, start with a sum of zero, pass the sum into the block, and add num to it, repeat.


        # If the result ends in zero (ie, is evenly divisible by 10), it is a valid Luhn number
        if checksum % 10 === 0
            puts "#{@number} is a valid luhn number"
        else
        # If the result does not end in zero,  add the difference between 10 and the remainder of check % 10.
            number = @number + (10 - checksum % 10)
            puts "#{number} would be a valid Luhn number"
        end
    end
end

l = Luhn.new(8763)
puts l.valid
