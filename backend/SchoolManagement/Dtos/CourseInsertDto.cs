namespace SchoolManagement.Dtos
{
    public class CourseInsertDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }
        public int TeacherId { get; set; }
        public int DepartmentId { get; set; }

    }
}
