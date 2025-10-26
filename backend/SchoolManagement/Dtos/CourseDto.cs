
namespace SchoolManagement.Dtos
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }

        public int TeacherId { get; set; }
        public TeacherInsertDto Teacher { get; set; }
        public int DepartmentId { get; set; }
        public DepartmentInsertDto Department { get; set; }
        public List<StudentDto> Students { get; set; }
    }
    public class CourseStudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }
        public bool IsSubscripe { get; set; }

        public int TeacherId { get; set; }
        public TeacherInsertDto Teacher { get; set; }
        public int DepartmentId { get; set; }
        public DepartmentInsertDto Department { get; set; }
    }
}
