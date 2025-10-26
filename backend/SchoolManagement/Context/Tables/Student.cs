namespace SchoolManagement.Context.Tables
{
    public class Student
    {
        public Student()
        {
            Courses = new HashSet<Course>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Email{ get; set; }
        public string Password { get; set; }


        public virtual ICollection<Course> Courses { get; set; }

    }
}
