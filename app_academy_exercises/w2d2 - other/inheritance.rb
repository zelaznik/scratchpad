class Employee
  attr_reader :name, :title, :salary, :boss
  def initialize(name, title, salary, boss)
    @name, @title, @salary, @boss = name, title, salary, boss
    boss.employees << self if boss
  end

  def bonus(multiplier)
    salary * multiplier
  end

  def combined_salary
    salary
  end

end

class Manager < Employee
  attr_reader :employees

  def initialize(name, title, salary, boss, *employees)
    super(name, title, salary, boss)
    @employees = employees
  end

  def bonus(multiplier)
    (combined_salary - salary) * multiplier
  end

  def combined_salary
    salary + employees.map(&:combined_salary).inject(:+)
  end

end

if __FILE__ = $0
  ned = Manager.new('Ned', 'Founder', 1000000, nil)
  darren = Manager.new('Darren', 'TA Manager', 78000, ned)
  shawna = Employee.new('Shawna', 'TA', 12000, darren)
  david = Employee.new('David', 'TA', 10000, darren)

  p ned.bonus(5)
  p darren.bonus(4)
  p david.bonus(3)

end
