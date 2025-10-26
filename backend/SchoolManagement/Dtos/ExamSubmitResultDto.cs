namespace SchoolManagement.Dtos
{
    public class ExamSubmitResultDto
    {
        public double Score { get; set; }
        public bool IsPassed { get; set; }
        public int CorrectAnswers { get; set; }
        public int TotalQuestions { get; set; }
        public List<ExamSubmitQuestionResultDto> Results { get; set; }
    }

    public class ExamSubmitQuestionResultDto
    {
        public int QuestionId { get; set; }
        public int UserAnswer { get; set; }
        public int CorrectAnswer { get; set; }
        public bool IsCorrect { get; set; }
    }
}