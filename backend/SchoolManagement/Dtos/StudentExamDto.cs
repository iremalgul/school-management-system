using SchoolManagement.Context.Tables;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Dtos
{
    public class StudentExamDto
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int StudentId { get; set; }
        public DateTime ExamStartDate { get; set; }
        public DateTime ExamEndDate { get; set; }
        public ExamDto Exam { get; set; }
        public StudentDto Student { get; set; }
        public virtual List<StudentAnswerDto> StudentAnswers { get; set; }
    }
    public class StudentExamInsertDto
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int StudentId { get; set; }
        public DateTime ExamStartDate { get; set; }
        public DateTime ExamEndDate { get; set; }
    }
}
