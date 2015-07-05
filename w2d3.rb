require 'sqlite3'

class SQLite3::Database
  def next_id(tbl_name)
  	qry = 'SELECT MAX(ID) FROM ' + tbl_name
  	id = self.execute(qry)[0][0]
  	(id==nil)? 1: id + 1
  end
end

$db = SQLite3::Database.new(':memory:')

$db.execute('''
CREATE TABLE Course (
   ID INTEGER PRIMARY KEY AUTOINCREMENT
  ,Name TEXT NOT NULL
  ,Department TEXT NOT NULL
  ,Number INTEGER NOT NULL
  ,Credits INTEGER NOT NULL

  ,UNIQUE (Department, Number)
);''')

$db.execute('''
CREATE TABLE Course_Schedule (
	ID INTEGER PRIMARY KEY AUTOINCREMENT
   ,CourseID INTEGER NOT NULL
   ,WeekdayID INTEGER NOT NULL
   ,HourID INTEGER NOT NULL

   ,UNIQUE (CourseID,WeekdayID,HourID)
   ,FOREIGN KEY(CourseID) REFERENCES Course(ID)
);''')

$db.execute('''
CREATE TABLE Student (
	 ID INTEGER PRIMARY KEY AUTOINCREMENT
	,First_Name TEXT NOT NULL
	,Last_Name TEXT NOT NULL
);''')

$db.execute('''
CREATE TABLE Enrollment (
	 ID INTEGER PRIMARY KEY AUTOINCREMENT
	,CourseID INTEGER NOT NULL
	,StudentID INTEGER NOT NULL
	
	,UNIQUE (CourseID, StudentID)
	,FOREIGN KEY(CourseID) REFERENCES Course(ID)
	,FOREIGN KEY(StudentID) REFERENCES Student(ID)
);''')

class Course
  attr_reader :id, :name, :department, :number, :credits

  def initialize(department, number, name, credits)
    @id = $db.next_id('Course')
    @name = name
    @department = department
    @number = number
    @credits = credits

    $db.execute '''
    INSERT INTO Course
    ( ID , Name, Department, Number , Credits )
    VALUES ( ? , ? , ? , ?, ?)
    ''', @id, name, department, number, credits
  end

  def add_student(student)
    student.enroll(self)
  end

  def inspect
    self.class.name + '(' + department + '-' + number.to_s + ': ' + name + ')'
  end

  def students
  	$db.execute '''
  	SELECT
  	  S.ID, S.First_Name, S.Last_Name
  	FROM
  	  Student as S
  	  INNER JOIN Enrollment as E ON S.ID = E.StudentID
  	WHERE
      E.CourseID = ?
  	''', self.id
  end
end

class Student
  attr_reader :id, :first_name, :last_name

  def initialize(first_name, last_name)
    @id = $db.next_id('Student')
    @first_name = first_name
    @last_name = last_name
    $db.execute '''
    INSERT INTO Student
    ( ID , First_Name, Last_Name )
    VALUES ( ? , ? , ? )
    ''', @id, first_name, last_name
  end

  def enroll(course)
  	$db.execute '''
  	INSERT INTO Enrollment
  	( CourseID , StudentID )
  	VALUES ( ? , ? )
  	''', course.id, self.id
  end

  def courses  	
  	$db.execute '''
  	SELECT
  	  C.Department, C.Number, C.Name, C.Credits
  	FROM
  	  Student as S
  	  INNER JOIN Enrollment as E ON S.ID = E.StudentID
  	  INNER JOIN Course as C ON C.ID = E.CourseID
  	WHERE
  	  S.ID = ?
  	''', self.id
  end

  def course_load
  	arr = ($db.execute '''
  	SELECT
  	  C.Department, SUM(C.Credits) AS Total_Credits
  	FROM
  	  Student as S
  	  INNER JOIN Enrollment as E ON S.ID = E.StudentID
  	  INNER JOIN Course as C ON C.ID = E.CourseID
  	WHERE
  	  S.ID = ?
  	GROUP BY
  	  C.Department
  	''', self.id)
  	Hash[*arr.flatten]
  end

  def name
    @first_name + ' ' + @last_name
  end

  def inspect
    self.class.name + '(id=' + id.to_s + ', first_name=' + first_name + ', last_name=' + last_name + ')'
  end
end

slacker = Student.new('Zach','Morris')
myself = Student.new('Steve', 'Zelaznik')
brother = Student.new('Michael','Zelaznik')
mom = Student.new('Lorraine', 'Kisselburgh')

english101 = Course.new('English', 101, 'Literature', 3)
chem109 = Course.new('Chemistry', 109, 'Stoichiometry', 5)
o_chem = Course.new('Chemistry', 225, 'Organic Chem', 3)
math431 = Course.new('Math', 431, 'Probability', 4)
math632 = Course.new('Math', 632, 'Stochastic', 3)

myself.enroll(chem109)
math431.add_student(myself)
myself.enroll(math632)
mom.enroll(english101)
brother.enroll(o_chem)
brother.enroll(english101)
