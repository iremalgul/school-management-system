using Microsoft.EntityFrameworkCore;
using SchoolManagement.Context;
using SchoolManagement.Context.Tables;

namespace SchoolManagement.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SchoolContext _myContext;
        public UnitOfWork(SchoolContext myContext)
        {
            _myContext = myContext;
        }
        private Repository<Course> _courseRepository;
        private Repository<Teacher> _teacherRepository;
        private Repository<Student> _studentRepository;
        private Repository<Department> _departmentRepository;
        private Repository<Exam> _examRepository;
        private Repository<ExamQuestion> _examQuestionRepository;
        private Repository<StudentExam> _studentExamRepository;
        private Repository<StudentAnswer> _studentAnswerRepository;

        public IRepository<Course> Course {
            get
            {
                if (_courseRepository == null)
                {
                    _courseRepository = new Repository<Course>(_myContext);
                }
                return _courseRepository;
            }
        }

        public IRepository<Teacher> Teacher
        {
            get
            {
                if (_teacherRepository == null)
                {
                    _teacherRepository = new Repository<Teacher>(_myContext);
                }
                return _teacherRepository;
            }
        }

        public IRepository<Student> Student
        {
            get
            {
                if (_studentRepository == null)
                {
                    _studentRepository = new Repository<Student>(_myContext);
                }
                return _studentRepository;
            }
        }
        public IRepository<Department> Department
        {
            get
            {
                if (_departmentRepository == null)
                {
                    _departmentRepository = new Repository<Department>(_myContext);
                }
                return _departmentRepository;
            }
        }

        public IRepository<Exam> Exam
        {
             get
            {
                if (_examRepository == null)
                {
                    _examRepository = new Repository<Exam>(_myContext);
                }
                return _examRepository;
            }
        }

        public IRepository<ExamQuestion> ExamQuestion
        {
            get
            {
                if (_examQuestionRepository == null)
                {
                    _examQuestionRepository = new Repository<ExamQuestion>(_myContext);
                }
                return _examQuestionRepository;
            }
        }

        public IRepository<StudentExam> StudentExam
        {
            get
            {
                if (_studentExamRepository == null)
                {
                    _studentExamRepository = new Repository<StudentExam>(_myContext);
                }
                return _studentExamRepository;
            }
        }

        public IRepository<StudentAnswer> StudentAnswer
        {
            get
            {
                if (_studentAnswerRepository == null)
                {
                    _studentAnswerRepository = new Repository<StudentAnswer>(_myContext);
                }
                return _studentAnswerRepository;
            }
        }
        public void Dispose()
        {
            _myContext.Dispose();
        }
    }
}
