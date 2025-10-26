using SchoolManagement.Context.Tables;

namespace SchoolManagement.UnitOfWork
{
    public interface IUnitOfWork :IDisposable
    {
        IRepository<Course> Course { get; }
        IRepository<Teacher> Teacher { get; }
        IRepository<Student> Student { get; }
        IRepository<Department> Department { get; }
        IRepository<Exam> Exam{ get; }
        IRepository<ExamQuestion> ExamQuestion { get; }
        IRepository<StudentExam> StudentExam { get; }
        IRepository<StudentAnswer> StudentAnswer { get; }

    }
}
