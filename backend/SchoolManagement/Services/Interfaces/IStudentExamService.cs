using SchoolManagement.Dtos;

namespace SchoolManagement.Services.Interfaces
{
    public interface IStudentExamService
    {
        Task<int> Insert(StudentExamInsertDto StudentExamDto);
        Task<bool> Update(StudentExamInsertDto StudentExamDto);
        Task<bool> Delete(int studentExamId);
        Task<List<StudentExamDto>> GetAll();
        Task<int> InsertAnswer(StudentAnswerInsertDto StudentAnswerDto);
        Task<bool> UpdateAnswer(StudentAnswerInsertDto StudentAnswerDto);
        Task<bool> DeleteAnswer(int studentAnswerId);
        Task<List<StudentAnswerDto>> GetAllAnswers();
    }
}
