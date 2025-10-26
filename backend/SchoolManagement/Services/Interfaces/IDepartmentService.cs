using SchoolManagement.Dtos;

namespace SchoolManagement.Services.Interfaces
{
    public interface IDepartmentService
    {
        Task<int> Insert(DepartmentInsertDto departmentDto);
        Task<List<DepartmentDto>> GetAll();
        Task<bool> Update(DepartmentInsertDto departmentDto);
        Task<bool> Delete(int departmentId);
        Task<DepartmentDto> GetById(int departmentId);
    }
}
