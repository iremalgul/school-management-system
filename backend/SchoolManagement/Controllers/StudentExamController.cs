using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Dtos;
using SchoolManagement.Services.Impls;
using SchoolManagement.Services.Interfaces;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentExamController : ControllerBase
    {
        private readonly IStudentExamService _studentExamService;

        public StudentExamController(IStudentExamService studentExamService)
        {
            _studentExamService = studentExamService;
        }

        [HttpPost]
        [Route("insertStudentExam")]
        public async Task<int> Insert(StudentExamInsertDto studentExamDto)
        {
            return await _studentExamService.Insert(studentExamDto);
        }

        [HttpPost]
        [Route("updateStudentExam")]
        public async Task<bool> Update(StudentExamInsertDto studentExamDto)
        {
            return await _studentExamService.Update(studentExamDto);
        }

        [HttpPost]
        [Route("deleteStudentExam")]
        public async Task<bool> Delete(int studentExamId)
        {
            return await _studentExamService.Delete(studentExamId);
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<List<StudentExamDto>> Getall()
        {
            return await _studentExamService.GetAll();
        }


        [HttpPost]
        [Route("insertAnswer")]
        public async Task<int> InsertAnswer(StudentAnswerInsertDto studentAnswerDto)
        {
            return await _studentExamService.InsertAnswer(studentAnswerDto);
        }
        [HttpPost]
        [Route("updateAnswer")]
        public async Task<bool> UpdateAnswer(StudentAnswerInsertDto studentAnswerDto)
        {
            return await _studentExamService.UpdateAnswer(studentAnswerDto);
        }

        [HttpPost]
        [Route("deleteAnswer")]
        public async Task<bool> DeleteAnswer(int studentAnswerId)
        {
            return await _studentExamService.DeleteAnswer(studentAnswerId);
        }

        [HttpGet]
        [Route("getAllAnswers")]
        public async Task<List<StudentAnswerDto>> GetAllAnswers()
        {
            return await _studentExamService.GetAllAnswers();
        }
    }
}
