using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.Context.Tables;
using SchoolManagement.Dtos;
using SchoolManagement.Helpers;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;

namespace SchoolManagement.Services.Impls
{
    public class StudentService : IStudentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper Mapper
        {
            get;
        }
        public StudentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            Mapper = mapper;
        }
        public async Task<bool> Delete(int studentDto)
        {
            try
            {
                var student = await _unitOfWork.Student.FindById(studentDto);
                int result = await _unitOfWork.Student.Delete(student);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<StudentDto>> GetAll()
        {
            var students = _unitOfWork.Student.Table.Include(t => t.Courses);
            var Dtos = Mapper.Map<List<StudentDto>>(students);
            return Dtos;
        }

        public async Task<StudentDto> GetById(int studentDto)
        {
            var students = _unitOfWork.Student.TableNoTracking.ToList();
            var Dtos = Mapper.Map<StudentDto>(students);
            return Dtos;
        }

        public async Task<StudentDto> GetFromSession()
        {
            throw new NotImplementedException();
        }

        public async Task<int> Insert(StudentInsertDto studentDto)
        {
            try
            {
                var student = Mapper.Map<Student>(studentDto);
                student.Password = StringCipher.Encrypt(studentDto.Password);
                await _unitOfWork.Student.Insert(student);
                return student.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<bool> Update(StudentInsertDto studentDto)
        {
            try
            {
                var entity = await _unitOfWork.Student.FindById(studentDto.Id);

                // Compare hashed/encrypted passwords directly
                if (studentDto.Password == entity.Password)
                {
                    // Password is the same, do not encrypt again
                    studentDto.Password = entity.Password;
                }
                else
                {
                    // Password changed, encrypt new password
                    studentDto.Password = StringCipher.Encrypt(studentDto.Password);
                }

                var student = Mapper.Map(studentDto, entity);
                int result = await _unitOfWork.Student.Update(student);
                return result > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
