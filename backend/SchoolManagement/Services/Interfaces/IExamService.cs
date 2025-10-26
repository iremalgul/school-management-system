using SchoolManagement.Dtos;
using SchoolManagement.Models;

namespace SchoolManagement.Services.Interfaces
{
    public interface IExamService
    {
        Task<int> Insert(ExamInsertDto examDto);
        Task<int> InsertQuestion(ExamQuestionInsertDto examQuestionDto);
        Task<List<ExamDto>> GetAll();
        Task<ExamDto> GetExamById(int examId);
        Task<List<ExamQuestionDto>> GetQuestionsByExamId(int examId);
        Task<bool> Update(ExamInsertDto examDto);
        Task<bool> UpdateQuestion(ExamQuestionInsertDto examQuestionDto);
        Task<bool> Delete(int examId);
        Task<bool> Delete(List<int> examIds);
        Task<bool> DeleteQuestion(int QuestionId);
        Task<bool> DeleteQuestions(List<int> QuestionIds);
        Task<List<ExamDto>> GetExamsByCourseId(int courseId);
        Task<bool> StartExam(int examId);
        
        Task<ExamSubmitResultDto> SubmitAnswers(ExamSubmitAnswersDto dto);
        Task<List<CourseDto>> GetUserCourses();
        Task<List<UserExamResultDto>> GetUserExamResults(int courseId);
        Task<bool> CheckExamSubmission(int examId);
    }
}
