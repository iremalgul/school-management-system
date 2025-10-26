using AutoMapper;
using SchoolManagement.Context.Tables;
using SchoolManagement.Dtos;
using SchoolManagement.Services.Interfaces;
using SchoolManagement.UnitOfWork;

namespace SchoolManagement.Services.Impls
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private IMapper Mapper
        {
            get;
        }

        public DepartmentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            Mapper = mapper;
        }
        public async Task<bool> Delete(int departmentId)
        {
            try
            {
                var department = await _unitOfWork.Department.FindById(departmentId);
                int result = await _unitOfWork.Department.Delete(department);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<DepartmentDto>> GetAll()
        {
            var departments = _unitOfWork.Department.TableNoTracking.ToList();
            var departmentDtos = Mapper.Map<List<DepartmentDto>>(departments);
            return departmentDtos;
        }

        public async Task<DepartmentDto> GetById(int departmentId)
        {
            var department = await _unitOfWork.Department.FindById(departmentId);
            var model = Mapper.Map<DepartmentDto>(department);
            return model;
        }

        public async Task<int> Insert(DepartmentInsertDto departmentDto)
        {
            try
            {
                var department = Mapper.Map<Department>(departmentDto);
                await _unitOfWork.Department.Insert(department);
                return department.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<bool> Update(DepartmentInsertDto departmentDto)
        {
            try
            {
                var entity = await _unitOfWork.Department.FindById(departmentDto.Id);
                var department = Mapper.Map(departmentDto, entity);
                int result = await _unitOfWork.Department.Update(department);
                if (result > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
