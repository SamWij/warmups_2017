
def count_nucleotides( string )

  bases = {
    "A" => 0,
    "C" => 0,
    "T" => 0,
    "G" => 0
  }

  message = []

  string.upcase.chars.each do |letter|

    is_nucleotide = false

    bases.each do |key, value|
      if letter == key
        bases[ key ] += 1
        is_nucleotide = true
      end
    end # bases.each

    unless is_nucleotide
      message.push "#{letter} is not a valid nucleotide"
    end

  end   # string.chars.each

  bases.each do |key, value|
    message.push "There are #{value} #{key}s in the string '#{string}'" if value > 0
  end

  message  # implicit return of message array
end

result = count_nucleotides "atgxggapt"
result.each{ |line| puts line }
