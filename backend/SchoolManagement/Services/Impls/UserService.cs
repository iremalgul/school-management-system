using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SchoolManagement.Models;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;

namespace SchoolManagement.Services.Impls
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork)
        {
            this._httpContextAccessor = httpContextAccessor;
            this._unitOfWork = unitOfWork;
        }

        public async Task<UserModel> getUser()
        {
            var re = _httpContextAccessor.HttpContext.Request;
            var headers = re.Headers;
            headers.TryGetValue("email", out var strings);
            string email = strings.First();

            var user = await _unitOfWork.Student.TableNoTracking.FirstOrDefaultAsync(x=> x.Email == email);

            if (user != null)
            {
                return new UserModel
                {
                    id = user.Id,
                    email = user.Email,
                    password = user.Password
                };
            }
            return null;
           
        }
    }
}
