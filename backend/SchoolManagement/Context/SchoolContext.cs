using Microsoft.EntityFrameworkCore;
using SchoolManagement.Context.Tables;
using System.Security.Cryptography.X509Certificates;

namespace SchoolManagement.Context
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
           
        }

        public DbSet<Course> Course { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Teacher> Teacher { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Exam> Exam { get; set; }
        public DbSet<ExamQuestion> ExamQuestion { get; set; }
        public DbSet<StudentExam> StudentExam { get; set; }
        public DbSet<StudentAnswer> StudentAnswer { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .HasMany(s => s.Students)
                .WithMany(c => c.Courses);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<StudentAnswer>()
        .HasOne(sa => sa.StudentExam)
        .WithMany(se => se.StudentAnswers)
        .HasForeignKey(sa => sa.StudentExamId)
        .OnDelete(DeleteBehavior.Cascade); // Sadece bunu CASCADE yap

            modelBuilder.Entity<StudentAnswer>()
                .HasOne(sa => sa.ExamQuestion)
                .WithMany()
                .HasForeignKey(sa => sa.ExamQuestionId)
                .OnDelete(DeleteBehavior.Restrict); // Bunu NO ACTION yap
        }

    }
}
