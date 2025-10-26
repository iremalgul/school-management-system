using AutoMapper;
using SchoolManagement.Context.Tables;
using SchoolManagement.Dtos;

namespace SchoolManagement
{
    public class SchoolMapper : Profile
    {
        public SchoolMapper()
        {
            CreateMap<Course, CourseDto>().ReverseMap();
            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Teacher, TeacherDto>().ReverseMap();
            CreateMap<Teacher, TeacherInsertDto>().ReverseMap();
            CreateMap<Course, CourseInsertDto>().ReverseMap();
            CreateMap<Student, StudentInsertDto>().ReverseMap();
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<Department, DepartmentInsertDto>().ReverseMap();
            CreateMap<Course, CourseStudentDto>().ReverseMap();
            CreateMap<Exam, ExamDto>().ReverseMap();
            CreateMap<ExamQuestion, ExamQuestionDto>().ReverseMap();
            CreateMap<Exam, ExamInsertDto>().ReverseMap();
            CreateMap<ExamQuestion, ExamQuestionInsertDto>().ReverseMap();
            CreateMap<StudentExam, StudentExamDto>().ReverseMap();
            CreateMap<StudentExam, StudentExamInsertDto>().ReverseMap();
            CreateMap<StudentAnswer, StudentAnswerDto>().ReverseMap();
            CreateMap<StudentAnswer, StudentAnswerInsertDto>().ReverseMap();



        }
    }
}
