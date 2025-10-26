using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Context.Tables
{
    public class StudentAnswer
    {
        public int Id { get; set; }
        public int StudentExamId { get; set; }
        public ChoiceEnum Choice { get; set; }
        public int ExamQuestionId { get; set; }
        [ForeignKey("StudentExamId")]
        public virtual StudentExam StudentExam { get; set; }
        [ForeignKey("ExamQuestionId")]
        public virtual ExamQuestion ExamQuestion { get; set; }
    }
}
