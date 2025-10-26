using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.Context.Tables;
using SchoolManagement.Dtos;
using SchoolManagement.Helpers;
using SchoolManagement.Models;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;
using System.Security.Cryptography;
using System.Text;

namespace SchoolManagement.Services.Impls
{
    public class TeacherService : ITeacherService
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper Mapper
        {
            get;
        }

        public TeacherService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            Mapper = mapper;
        }
        public async Task<bool> Delete(int teacherId)
        {
            try
            {
                var teacher = await _unitOfWork.Teacher.FindById(teacherId);
                int result = await _unitOfWork.Teacher.Delete(teacher);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<TeacherDto>> GetAll()
        {
            var teachers = _unitOfWork.Teacher.TableNoTracking.ToList();
            var teacherDtos = Mapper.Map<List<TeacherDto>>(teachers);
            return teacherDtos;
        }

        public async Task<TeacherDto> GetById(int teacherId)
        {
            var teacher = await _unitOfWork.Teacher.FindById(teacherId);
            var model = Mapper.Map<TeacherDto>(teacher);
            return model;
        }

        public async Task<int> Insert(TeacherInsertDto teacherDto)
        {
            try
            {
                var teacher = Mapper.Map<Teacher>(teacherDto);
                teacher.Password = StringCipher.Encrypt(teacher.Password);
                await _unitOfWork.Teacher.Insert(teacher);
                return teacher.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<bool> Update(TeacherInsertDto teacherDto)
        {
            try
            {
                var entity = await _unitOfWork.Teacher.FindById(teacherDto.Id);

                // Compare hashed passwords directly
                if (teacherDto.Password == entity.Password)
                {
                    // Password is the same, do not encrypt again
                    teacherDto.Password = entity.Password;
                }
                else
                {
                    // Password changed, encrypt new password
                    teacherDto.Password = StringCipher.Encrypt(teacherDto.Password);
                }

                var teacher = Mapper.Map(teacherDto, entity);
                int result = await _unitOfWork.Teacher.Update(teacher);
                return result > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

   
    }
}
