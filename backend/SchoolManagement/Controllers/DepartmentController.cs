using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Dtos;
using SchoolManagement.Services.Interfaces;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpPost]
        [Route("insertDepartment")]
        public async Task<int> Insert(DepartmentInsertDto departmentDto)
        {
            return await _departmentService.Insert(departmentDto);
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<List<DepartmentDto>> Getall()
        {
            return await _departmentService.GetAll();
        }

        [HttpPost]
        [Route("updateDepartment")]
        public async Task<bool> Update(DepartmentInsertDto departmentDto)
        {
            return await _departmentService.Update(departmentDto);
        }

        [HttpPost]
        [Route("deleteDepartment")]
        public async Task<bool> Delete(int departmentId)
        {
            return await _departmentService.Delete(departmentId);
        }

        [HttpGet]
        [Route("getbyId")]
        public async Task<DepartmentDto> GetById(int departmentId)
        {
            return await _departmentService.GetById(departmentId);
        }
    }
}
