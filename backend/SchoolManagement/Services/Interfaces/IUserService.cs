using SchoolManagement.Models;

namespace SchoolManagement.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserModel> getUser();
    }
}
