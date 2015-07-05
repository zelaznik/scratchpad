class SteveZelaznikError < StandardError
  def initialize(message, *other_args)
    @other_args = other_args
    super(message)
  end
end

begin
  puts "Begin"
  raise SteveZelaznikError.new("Age 31")
  puts "This will never be printed"

rescue SteveZelaznikError => e
  puts e.message
end
