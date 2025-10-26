using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.Context.Tables;
using SchoolManagement.Dtos;
using SchoolManagement.Models;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;

namespace SchoolManagement.Services.Impls
{
    public class CourseService : ICourseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserService _userService;
        private readonly IExamService _examService;
        private IMapper Mapper
        {
            get;
        }

        public CourseService(IUnitOfWork unitOfWork, IUserService userService, IExamService examService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userService = userService;
            _examService = examService;
            Mapper = mapper;
        }

        public async Task<bool> Delete(int courseId)
        {
            try
            {
                var course = await _unitOfWork.Course.FindById(courseId);
                int result = await _unitOfWork.Course.Delete(course);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<CourseDto>> GetAll()
        {
            var courses = _unitOfWork.Course.Table.Include(s => s.Students).Include(t => t.Teacher);
            var Dtos = Mapper.Map<List<CourseDto>>(courses);
            return Dtos;
        }

        public async Task<CourseDto> GetById(int courseId)
        {
            var course = await _unitOfWork.Course.FindById(courseId);
            var model = Mapper.Map<CourseDto>(course);
            return model;
        }

        public async Task<int> Insert(CourseInsertDto courseDto)
        {
            try
            {
                var course = Mapper.Map<Course>(courseDto);
                await _unitOfWork.Course.Insert(course);
                return course.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<bool> Update(CourseInsertDto courseDto)
        {
            try
            {
                var entity = await _unitOfWork.Course.FindById(courseDto.Id);
                var course = Mapper.Map(courseDto, entity);
                int result = await _unitOfWork.Course.Update(course);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> TakeCourse(CourseStudentModel model)
        {
            try
            {
                var course = await _unitOfWork.Course.Table.Include(c => c.Students).FirstOrDefaultAsync(c => c.Id == model.CoursesId);
                var student = await _unitOfWork.Student.Table.FirstOrDefaultAsync(x => x.Email == model.StudentsId);
                if (model.isSubscribe)
                {
                    course.Students.Add(student);
                }
                else
                {
                    course.Students.Remove(student);
                }

                int result = await _unitOfWork.Course.Update(course);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<CourseStudentDto>> GetAllForStudent()
        {
            var user = await _userService.getUser();
            var courses = _unitOfWork.Course.Table.Include(s => s.Students).Include(x => x.Department).Include(t => t.Teacher);
            var Dtos = Mapper.Map<List<CourseStudentDto>>(courses);
            Dtos.ForEach(async x =>
            {
                var course = _unitOfWork.Course.Table.Include(x=>x.Students).FirstOrDefault(y=>y.Id == x.Id);
                x.IsSubscripe = course.Students.Any(x => x.Id == user.id);
                
            });
            return Dtos;
        }

        public async Task<List<CourseStudentDto>> GetStudentCourses()
        {
            var user = await _userService.getUser(); // Giriş yapan öğrenci

            // Sadece öğrencinin kayıtlı olduğu dersler
            var courses = await _unitOfWork.Course.Table
                .Include(c => c.Department)
                .Include(c => c.Teacher)
                .Include(c => c.Students)
                .Include(c=> c.Exams)
                .Where(c => c.Students.Any(s => s.Id == user.id)) // sadece bu öğrencinin kayıtlı olduğu dersler
                .ToListAsync();

            var dtos = Mapper.Map<List<CourseStudentDto>>(courses);

            // Bu listede öğrencinin kayıtlı olduğu dersler var zaten, dolayısıyla IsSubscripe = true olabilir
            dtos.ForEach(dto => dto.IsSubscripe = true);

            return dtos;
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
