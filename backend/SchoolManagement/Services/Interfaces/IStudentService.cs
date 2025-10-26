using SchoolManagement.Dtos;

namespace SchoolManagement.Services.Interfaces
{
    public interface IStudentService
    {
        Task<int> Insert(StudentInsertDto studentDto);
        Task<List<StudentDto>> GetAll();
        Task<bool> Update(StudentInsertDto studentDto);
        Task<bool> Delete(int studentDto);
        Task<StudentDto> GetById(int studentDto);
        Task<StudentDto> GetFromSession();
    }
}
