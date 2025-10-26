using SchoolManagement.Context.Tables;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Dtos
{
    public class ExamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ExamDateStart { get; set; }
        public DateTime ExamDateEnd { get; set; }
        public int CourseId { get; set; }
        public  CourseDto Course { get; set; }
        public decimal PassPoint { get; set; }
        public int DurationMinutes { get; set; }
        public virtual List<ExamQuestion> ExamQuestions { get; set; }
    }
    public class ExamInsertDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ExamDateStart { get; set; }
        public DateTime ExamDateEnd { get; set; }
        public int CourseId { get; set; }
        public decimal PassPoint { get; set; }
        public int DurationMinutes { get; set; }
        
    }

    public class ExamQuestionDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public ChoiceEnum TrueChoice { get; set; }
        public int ExamId { get; set; }
        public  ExamDto Exam { get; set; }
        public string ChoiceA { get; set; }
        public string ChoiceB { get; set; }
        public string ChoiceC { get; set; }
        public string ChoiceD { get; set; }
        public string ChoiceE { get; set; }
    }

    public class ExamQuestionInsertDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public ChoiceEnum TrueChoice { get; set; }
        public int ExamId { get; set; }
        public string ChoiceA { get; set; }
        public string ChoiceB { get; set; }
        public string ChoiceC { get; set; }
        public string ChoiceD { get; set; }
        public string ChoiceE { get; set; }
    }
}


