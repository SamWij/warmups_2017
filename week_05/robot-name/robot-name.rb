
class Robot

  def name
    @name
  end

  def mac_address
    @mac_address
  end

  def initialize
    @mac_address = generate_letters 6
    @instruction_count = 0
    @created_time = Time.now
    puts "Created time is: #{ @created_time }"
    generate_name
  end

  def generate_name
    @instruction_count += 1
    @name = "#{ generate_letters( 2 ) }-#{generate_numbers}"
  end

  def generate_letters( length )
    ("A".."Z").to_a.sample( length ).join
  end

  def generate_numbers
    (0..9).to_a.sample(3).join
  end

  def timers
    @instruction_count += 1
    @time_since_created = Time.now - @created_time
    puts "This robot was created #{ @time_since_created } seconds ago."
  end

  def reset
    generate_name
    @instruction_count = 0
    puts "Resetting to factory settings..."
  end

end

robby = Robot.new

puts robby.name
puts robby.mac_address

sleep 1

robby.timers
robby.reset

puts robby.name
