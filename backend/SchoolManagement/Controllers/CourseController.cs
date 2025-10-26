using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Dtos;
using SchoolManagement.Models;
using SchoolManagement.Services.Impls;
using SchoolManagement.Services.Interfaces;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost]
        [Route("insertCourse")]
        public async Task<int> Insert(CourseInsertDto courseDto)
        {
            return await _courseService.Insert(courseDto);
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<List<CourseDto>> Getall()
        {
            return await _courseService.GetAll();
        }
        [HttpGet]
        [Route("GetAllForStudent")]
        public async Task<List<CourseStudentDto>> GetAllForStudent()
        {
            return await _courseService.GetAllForStudent();
        }
        [HttpGet]
        [Route("GetStudentCourses")]
        public async Task<List<CourseStudentDto>> GetStudentCourses()
        {
            return await _courseService.GetStudentCourses();
        }

        [HttpPost]
        [Route("updateCourse")]
        public async Task<bool> Update(CourseInsertDto courseDto)
        {
            return await _courseService.Update(courseDto);
        }

        [HttpPost]
        [Route("deleteCourse")]
        public async Task<bool> Delete(int courseId)
        {
            return await _courseService.Delete(courseId);
        }

        [HttpPost]
        [Route("takeCourse")]
        public async Task<bool> takeCourse(CourseStudentModel model)
        {
            return await _courseService.TakeCourse(model);
        }
    }
}
