using SchoolManagement.Dtos;
using SchoolManagement.Models;

namespace SchoolManagement.Services.Interfaces
{
    public interface ICourseService
    {
        Task<int> Insert(CourseInsertDto courseDto);
        Task<List<CourseDto>> GetAll();
        Task<List<CourseStudentDto>> GetAllForStudent();
        Task<List<CourseStudentDto>> GetStudentCourses();
        Task<bool> Update(CourseInsertDto courseDto);
        Task<bool> Delete(int courseId);
        Task<CourseDto> GetById(int courseId);
        Task<bool> TakeCourse(CourseStudentModel model);
    }
}
