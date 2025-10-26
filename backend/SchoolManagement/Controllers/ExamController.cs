using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Dtos;
using SchoolManagement.Services.Impls;
using SchoolManagement.Services.Interfaces;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IExamService _examService;

        public ExamController(IExamService examService)
        {
            _examService = examService;
        }



        [HttpPost]
        [Route("insertExam")]
        public async Task<int> Insert(ExamInsertDto examDto)
        {
            return await _examService.Insert(examDto);
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<List<ExamDto>> Getall()
        {
            return await _examService.GetAll();
        }

        [HttpGet]
        [Route("getExamById")]
        public async Task<ExamDto> GetExamById(int examId)
        {
            return await _examService.GetExamById(examId);
        }

        [HttpPost]
        [Route("updateExam")]
        public async Task<bool> Update(ExamInsertDto examDto)
        {
            return await _examService.Update(examDto);
        }

        [HttpPost]
        [Route("deleteExam")]
        public async Task<bool> Delete(int examId)
        {
            return await _examService.Delete(examId);
        }

        [HttpPost]
        [Route("deleteExams")]
        public async Task<bool> Delete(List<int> examIds)
        {
            return await _examService.Delete(examIds);
        }


        [HttpPost]
        [Route("insertExamQuestion")]
        public async Task<int> InsertQuestion(ExamQuestionInsertDto examQuestionDto)
        {
            return await _examService.InsertQuestion(examQuestionDto);
        }

        [HttpGet]
        [Route("getQuestionsByExamId")]
        public async Task<List<ExamQuestionDto>> GetQuestionsByExamId(int examId)
        {
            return await _examService.GetQuestionsByExamId(examId);
        }

        [HttpPost]
        [Route("updateExamQuestion")]
        public async Task<bool> UpdateQuestion(ExamQuestionInsertDto examQuestionDto)
        {
            return await _examService.UpdateQuestion(examQuestionDto);
        }

        [HttpPost]
        [Route("deleteExamQuestion")]
        public async Task<bool> DeleteQuestion(int examQuestionId)
        {
            return await _examService.DeleteQuestion(examQuestionId);
        }

        [HttpPost]
        [Route("deleteExamQuestions")]
        public async Task<bool> DeleteQuestions(List<int> examQuestionIds)
        {
            return await _examService.DeleteQuestions(examQuestionIds);
        }

        [HttpGet]
        [Route("getExamsByCourseId")]
        public async Task<List<ExamDto>> GetExamsByCourseId(int courseId)
        {
            return await _examService.GetExamsByCourseId(courseId);
        }

        [HttpPost]
        [Route("startExam")]
        public async Task<bool> StartExam(int examId)
        {
            return await _examService.StartExam(examId);
        }

        [HttpPost]
        [Route("submitAnswers")]
        public async Task<ExamSubmitResultDto> SubmitAnswers([FromBody] ExamSubmitAnswersDto dto)
        {
            return await _examService.SubmitAnswers(dto);
        }

        [HttpGet]
        [Route("getUserCourses")]
        public async Task<List<CourseDto>> GetUserCourses()
        {
            return await _examService.GetUserCourses();
        }

        [HttpGet]
        [Route("getUserExamResults")]
        public async Task<List<UserExamResultDto>> GetUserExamResults(int courseId)
        {
            return await _examService.GetUserExamResults(courseId);
        }

        [HttpGet("checkExamSubmission")]
        public async Task<ActionResult<bool>> CheckExamSubmission(int examId)
        {
            var result = await _examService.CheckExamSubmission(examId);
            return Ok(result);
        }
    }
}
