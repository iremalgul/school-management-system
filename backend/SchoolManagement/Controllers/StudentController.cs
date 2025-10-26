using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Dtos;
using SchoolManagement.Services.Interfaces;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPost]
        [Route("insertStudent")]
        public async Task<int> Insert(StudentInsertDto studentDto)
        {
            return await _studentService.Insert(studentDto);
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<List<StudentDto>> Getall()
        {
            return await _studentService.GetAll();
        }

        [HttpPost]
        [Route("updateStudent")]
        public async Task<bool> Update(StudentInsertDto studentDto)
        {
            return await _studentService.Update(studentDto);
        }

        [HttpPost]
        [Route("deleteStudent")]
        public async Task<bool> Delete(int studentId)
        {
            return await _studentService.Delete(studentId);
        }
    }
}
