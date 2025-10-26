using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Context.Tables
{
    public class Course
    {
        public Course()
        {
            Students = new HashSet<Student>();
            Exams = new HashSet<Exam>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }

        public int TeacherId { get; set; }

        [ForeignKey("TeacherId")]
        public virtual Teacher Teacher { get; set; }
        public virtual ICollection<Student> Students { get; set; }
        public virtual ICollection<Exam> Exams { get; set; }
        public int DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }

    }
}
