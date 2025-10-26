using SchoolManagement.Dtos;
using SchoolManagement.Models;

namespace SchoolManagement.Services.Interfaces
{
    public interface ITeacherService
    {
        Task<int> Insert(TeacherInsertDto teacherDto);
        Task<List<TeacherDto>> GetAll();
        Task<bool> Update(TeacherInsertDto teacherDto);
        Task<bool> Delete(int teacherId);
        Task<TeacherDto> GetById(int teacherId);
        
    }
}
