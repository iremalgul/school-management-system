using SchoolManagement.Context.Tables;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Dtos
{
    public class StudentAnswerDto
    {
        public int Id { get; set; }
        public int StudentExamId { get; set; }
        public ChoiceEnum Choice { get; set; }
        public int ExamQuestionId { get; set; }
        public StudentExamDto StudentExam { get; set; }
        public ExamQuestionDto ExamQuestion { get; set; }
    }
    public class StudentAnswerInsertDto
    {
        public int Id { get; set; }
        public int StudentExamId { get; set; }
        public ChoiceEnum Choice { get; set; }
        public int ExamQuestionId { get; set; }
       
    }
}
