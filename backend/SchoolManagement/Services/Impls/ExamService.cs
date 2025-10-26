using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.Context.Tables;
using SchoolManagement.Dtos;
using SchoolManagement.Migrations;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;

namespace SchoolManagement.Services.Impls
{
    public class ExamService : IExamService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISignalRService _signalRService;
        private readonly IUserService _userService;

        private IMapper Mapper
        {
            get;
        }

        public ExamService(IUnitOfWork unitOfWork, ISignalRService signalRService, IMapper mapper, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _signalRService = signalRService;
            Mapper = mapper;
            _userService = userService;
        }

        public async Task<int> Insert(ExamInsertDto examDto)
        {
            try
            {
                var exam = Mapper.Map<Exam>(examDto);
                await _unitOfWork.Exam.Insert(exam);
                return exam.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
            finally
            {
                //await _signalRService.SendMessage("başarılı");
            }
        }

        public async Task<List<ExamDto>> GetAll()
        {
            var exams = _unitOfWork.Exam.Table.Include(c => c.Course);
            var Dtos = Mapper.Map<List<ExamDto>>(exams);
            return Dtos;
        }

        public async Task<bool> Update(ExamInsertDto examDto)
        {
            try
            {
                var entity = await _unitOfWork.Exam.FindById(examDto.Id);
                var exam = Mapper.Map(examDto, entity);
                int result = await _unitOfWork.Exam.Update(exam);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int examId)
        {
            try
            {
                var exam = await _unitOfWork.Exam.FindById(examId);
                int result = await _unitOfWork.Exam.Delete(exam);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(List<int> examIds)
        {
            try
            {
                var exams = new List<Exam>();
                foreach (var id in examIds)
                {
                    var exam = await _unitOfWork.Exam.FindById(id);
                    if (exam != null)
                        exams.Add(exam);
                }

                int result = await _unitOfWork.Exam.Delete(exams);
                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<int> InsertQuestion(ExamQuestionInsertDto examQuestionDto)
        {
            try
            {
                var examQuestion = Mapper.Map<ExamQuestion>(examQuestionDto);
                await _unitOfWork.ExamQuestion.Insert(examQuestion);
                return examQuestion.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<List<ExamQuestionDto>> GetQuestionsByExamId(int examId)
        {
            var examQuestions = _unitOfWork.ExamQuestion.Table.Where(q => q.ExamId == examId);
            var Dtos = Mapper.Map<List<ExamQuestionDto>>(examQuestions);
            return Dtos;
        }

        public async Task<bool> UpdateQuestion(ExamQuestionInsertDto examQuestionDto)
        {
            try
            {
                var entity = await _unitOfWork.ExamQuestion.FindById(examQuestionDto.Id);
                var examQuestion = Mapper.Map(examQuestionDto, entity);
                int result = await _unitOfWork.ExamQuestion.Update(examQuestion);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteQuestion(int QuestionId)
        {
            try
            {
                var examQuestion = await _unitOfWork.ExamQuestion.FindById(QuestionId);
                int result = await _unitOfWork.ExamQuestion.Delete(examQuestion);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<bool> DeleteQuestions(List<int> QuestionIds)
        {
            try
            {

                var examQuestions = new List<ExamQuestion>();
                foreach (var id in QuestionIds)
                {
                    var question = await _unitOfWork.ExamQuestion.FindById(id);
                    if (question != null)
                        examQuestions.Add(question);
                }

                int result = await _unitOfWork.ExamQuestion.Delete(examQuestions);
                return result > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<ExamDto>> GetExamsByCourseId(int courseId)
        {
            var exams = _unitOfWork.Exam.Table.Include(c => c.Course).Where(e => e.CourseId == courseId); 
            var Dtos = Mapper.Map<List<ExamDto>>(exams);
            return Dtos;
        }

        public async Task<ExamDto> GetExamById(int examId)
        {
            var exam = await _unitOfWork.Exam.FindById(examId);
            var Dto = Mapper.Map<ExamDto>(exam);
            return Dto;
        }
        public async Task<bool> StartExam(int examId)
        {
            var exam = await _unitOfWork.Exam.FindById(examId);
            if (exam == null)
                return false;

            // Use exam.DurationMinutes when starting the exam
            await _signalRService.StartExam(exam.DurationMinutes);
            return true;
        }

        public async Task<List<CourseDto>> GetUserCourses()
        {
            var user = await _userService.getUser();
            var courses = await _unitOfWork.Course.Table
                .Include(c => c.Department)
                .Include(c => c.Teacher)
                .Include(c => c.Students)
                .Where(c => c.Students.Any(s => s.Id == user.id))
                .ToListAsync();

            return Mapper.Map<List<CourseDto>>(courses);
        }

        public async Task<List<UserExamResultDto>> GetUserExamResults(int courseId)
        {
            var user = await _userService.getUser();

            var exams = await _unitOfWork.Exam.Table
                .Where(e => e.CourseId == courseId)
                .ToListAsync();

            var results = new List<UserExamResultDto>();

            foreach (var exam in exams)
            {
                var studentExam = await _unitOfWork.StudentExam.Table
                    .FirstOrDefaultAsync(se => se.ExamId == exam.Id && se.StudentId == user.id);

                if (studentExam != null)
                {
                    // StudentAnswer'ları çek
                    var studentAnswers = await _unitOfWork.StudentAnswer.Table
                        .Where(sa => sa.StudentExamId == studentExam.Id)
                        .ToListAsync();

                    int correctAnswers = 0;
                    foreach (var sa in studentAnswers)
                    {
                        var question = await _unitOfWork.ExamQuestion.FindById(sa.ExamQuestionId);
                        if (question != null && question.TrueChoice == sa.Choice)
                            correctAnswers++;
                    }

                    int totalQuestions = studentAnswers.Count;

                    results.Add(new UserExamResultDto
                    {
                        ExamName = exam.Name,
                        Score = studentExam.Grade,
                        IsPassed = (decimal)studentExam.Grade >= exam.PassPoint,
                        SubmittedAt = studentExam.ExamEndDate,
                        CorrectAnswers = correctAnswers,
                        TotalQuestions = totalQuestions
                    });
                }
            }

            return results;
        }

        public async Task<ExamSubmitResultDto> SubmitAnswers(ExamSubmitAnswersDto dto)
        {
            // Giriş yapan öğrenciyi al
            var user = await _userService.getUser();
            int studentId = user.id;

            var questions = _unitOfWork.ExamQuestion.Table
                .Where(q => q.ExamId == dto.ExamId)
                .ToList();

            var exam = await _unitOfWork.Exam.FindById(dto.ExamId);

            var results = new List<ExamSubmitQuestionResultDto>();
            int correctCount = 0;

            foreach (var question in questions)
            {
                dto.Answers.TryGetValue(question.Id, out int userAnswer);
                bool isCorrect = ((int)question.TrueChoice == userAnswer);

                if (isCorrect)
                    correctCount++;

                results.Add(new ExamSubmitQuestionResultDto
                {
                    QuestionId = question.Id,
                    UserAnswer = userAnswer,
                    CorrectAnswer = (int)question.TrueChoice,
                    IsCorrect = isCorrect
                });
            }

            int totalQuestions = questions.Count;
            double score = totalQuestions > 0 ? Math.Round((double)correctCount / totalQuestions * 100, 2) : 0;
            bool isPassed = exam != null && score >= (double)exam.PassPoint;

            // StudentExam kaydı oluştur
            var studentExam = new StudentExam
            {
                ExamId = dto.ExamId,
                StudentId = studentId,
                Grade = score,
                StudentAnswers = new List<StudentAnswer>()
            };
            await _unitOfWork.StudentExam.Insert(studentExam);

            // StudentAnswer kayıtlarını oluştur
            foreach (var answer in dto.Answers)
            {
                var studentAnswer = new StudentAnswer
                {
                    Choice = (ChoiceEnum)answer.Value
                };
                studentExam.StudentAnswers.Add(studentAnswer);

               
                 studentAnswer.StudentExamId = studentExam.Id;
                 studentAnswer.ExamQuestionId = answer.Key;
            }

            // StudentExam ile birlikte StudentAnswer'lar da kaydedilmiş olur (EF Core cascade insert)
            await _unitOfWork.StudentExam.Update(studentExam);

            return new ExamSubmitResultDto
            {
                Score = score,
                IsPassed = isPassed,
                CorrectAnswers = correctCount,
                TotalQuestions = totalQuestions,
                Results = results
            };
        }

        public async Task<bool> CheckExamSubmission(int examId)
        {
            var user = await _userService.getUser();
            var submission = await _unitOfWork.StudentExam.Table
                .FirstOrDefaultAsync(se => se.ExamId == examId && se.StudentId == user.id);
            return submission != null;
        }
    }
}
