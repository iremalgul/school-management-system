using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagement.Context.Tables
{
    public class Exam
    {
        public Exam()
        {
            ExamQuestions = new HashSet<ExamQuestion>(); 
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ExamDateStart { get; set; }
        public DateTime ExamDateEnd { get; set; }
        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; }
        public decimal PassPoint { get; set; }
        public virtual ICollection<ExamQuestion> ExamQuestions { get; set; }

        // Add this property
        public int DurationMinutes { get; set; }
    }
}
