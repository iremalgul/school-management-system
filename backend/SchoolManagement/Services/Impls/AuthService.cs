using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolManagement.Helpers;
using SchoolManagement.Models;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;

namespace SchoolManagement.Services.Impls
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper Mapper
        {
            get;
        }

        public AuthService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            Mapper = mapper;
        }

        public Task<UserModel> Login(UserModel user)
        {
            var pass = StringCipher.Encrypt(user.password);
            var teacher = _unitOfWork.Teacher.TableNoTracking.FirstOrDefault(t => t.Email == user.email && t.Password == pass);
            var student = _unitOfWork.Student.TableNoTracking.FirstOrDefault(x => x.Password == pass && x.Email == user.email);

            if (teacher != null)
            {
                var result = new UserModel()
                {
                    name = teacher.Name,
                    email = teacher.Email,
                    password = teacher.Password,
                    isAdmin = true,
                    message = "Giriş başarılı",
                    success = true
                };
                return Task.FromResult(result);
            }

            else if (student != null)
            {
                var result = new UserModel()
                {
                    name = student.Name,
                    number = student.Number,
                    email = student.Email,
                    password = student.Password,
                    isAdmin = false,
                    message = "Giriş başarılı",
                    success = true
                };
                return Task.FromResult(result);
            }
            else
            {
                var result = new UserModel()
                {
                    message = "Giriş başarısız",
                    success = false
                };
                return Task.FromResult(result);
            }
            
        }
    }
}
