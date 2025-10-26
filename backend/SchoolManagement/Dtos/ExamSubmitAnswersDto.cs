namespace SchoolManagement.Dtos
{
    public class ExamSubmitAnswersDto
    {
        public int ExamId { get; set; }
        public Dictionary<int, int> Answers { get; set; } // QuestionId, UserAnswer (ChoiceEnum int)
    }
}