using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Dtos;
using SchoolManagement.Services.Impls;
using SchoolManagement.Services.Interfaces;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpPost]
        [Route("insertTeacher")]
        public async Task<int> Insert(TeacherInsertDto teacherDto)
        {
            return await _teacherService.Insert(teacherDto);
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<List<TeacherDto>> Getall()
        {
            return await _teacherService.GetAll();
        }

        [HttpPost]
        [Route("updateTeacher")]
        public async Task<bool> Update(TeacherInsertDto teacherDto)
        {
            return await _teacherService.Update(teacherDto);
        }

        [HttpPost]
        [Route("deleteTeacher")]
        public async Task<bool> Delete(int teacherId)
        {
            return await _teacherService.Delete(teacherId);
        }

        [HttpGet]
        [Route("getbyId")]
        public async Task<TeacherDto> GetById(int teacherId)
        {
            return await _teacherService.GetById(teacherId);
        }

    }
}
