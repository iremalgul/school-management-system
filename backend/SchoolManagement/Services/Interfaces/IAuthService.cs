using SchoolManagement.Models;

namespace SchoolManagement.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserModel> Login(UserModel user);
    }
}
