namespace SchoolManagement.Dtos
{
    public class UserExamResultDto
    {
        public string ExamName { get; set; }
        public double Score { get; set; }
        public bool IsPassed { get; set; }
        public DateTime SubmittedAt { get; set; }
        public int CorrectAnswers { get; set; }
        public int TotalQuestions { get; set; }
    }
}