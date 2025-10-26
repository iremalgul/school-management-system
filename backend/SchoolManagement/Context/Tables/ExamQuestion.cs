using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Context.Tables
{
    public class ExamQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public ChoiceEnum TrueChoice { get; set; }
        public int ExamId { get; set; }
        [ForeignKey("ExamId")]
        public virtual Exam Exam { get; set; }
        public string ChoiceA { get; set; }
        public string ChoiceB { get; set; }
        public string ChoiceC { get; set; }
        public string ChoiceD { get; set; }
        public string ChoiceE { get; set; }

    }
    public enum ChoiceEnum
    {
        A = 1,
        B = 2,
        C = 3,
        D = 4,
        E = 5,
    }
}
