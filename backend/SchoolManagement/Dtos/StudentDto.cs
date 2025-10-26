
namespace SchoolManagement.Dtos
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<CourseInsertDto> Courses { get; set; }
    }
}
