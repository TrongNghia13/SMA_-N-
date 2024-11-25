using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class EmployeeService : IEmployee
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Employee> _employeeRepository;
        private readonly IRepository<CateJobTitle> _cateJobTitleRepository;
        private readonly IRepository<OrganizationUnit> _organizationUnitRepository;


        private readonly IMapper _mapper;

        public EmployeeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _employeeRepository = _unitOfWork.EmployeeRepository;
            _cateJobTitleRepository = _unitOfWork.CateJobTitleRepository;
            _organizationUnitRepository = _unitOfWork.OrganizationUnitRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(EmployeeModel employeeModel)
        {
            var _mapping = _mapper.Map<Employee>(employeeModel);
            try
            {
                await _employeeRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = employeeModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = employeeModel,
                };
            }

        }

        public async Task<ApiResponeModel> Update(int id, EmployeeModel employeeModel)
        {
            try
            {
                var map = _mapper.Map<Employee>(employeeModel);
                if (id != employeeModel.EmployeeID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _employeeRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = employeeModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = employeeModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _employeeRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _employeeRepository.DeleteAsync(value);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Data = id,
                        Success = true,
                        Message = "Delete Successfully"
                    };
                }
                catch (Exception ex)
                {
                    return new ApiResponeModel
                    {
                        Data = id,
                        Success = false,
                        Message = "There was an error during the data deletion process." + ex.Message
                    };
                }
            }
            return new ApiResponeModel
            {
                Data = id,
                Success = false,
                Message = "ID Not Found"
            };
        }
        public async Task<IEnumerable<EmployeeModel>> GetAll(EmployeeRequestModel? employeeRequestModel)
        {
            var listEntity = await _employeeRepository.GetAllAsync();
            if(employeeRequestModel != null)
            {
                if(employeeRequestModel.FullName != null && employeeRequestModel.FullName.Length > 0)
                {
                    listEntity = listEntity.Where(c=>c.FullName == employeeRequestModel.FullName).ToList();
                }
                if (employeeRequestModel.EmployeeCode != null && employeeRequestModel.EmployeeCode.Length > 0)
                {
                    listEntity = listEntity.Where(c => c.EmployeeCode == employeeRequestModel.EmployeeCode).ToList();
                }
                if (employeeRequestModel.OrganizationUnitID != null && employeeRequestModel.OrganizationUnitID > 0)
                {
                    listEntity = listEntity.Where(c => c.OrganizationUnitID == employeeRequestModel.OrganizationUnitID).ToList();
                }
            }

            var mapList = _mapper.Map<List<EmployeeModel>>(listEntity);
            for(int i = 0; i < mapList.Count; i++)
            {
                var jobtitle = await _cateJobTitleRepository.GetAsync(mapList[i].JobTitleID);
                var organization = await _organizationUnitRepository.GetAsync(mapList[i].OrganizationUnitID);
                if (jobtitle != null)
                {
                    mapList[i].JobTitleName = jobtitle.JobTitleName;
                }
                if(organization != null)
                {
                    mapList[i].OrganizationUnitName = organization.OrganizationUnitName;
                }
            }
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _employeeRepository.GetAsync(id);
            var entityMapped = _mapper.Map<EmployeeModel>(entity);
            if (entityMapped == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = entityMapped,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        public async Task<IEnumerable<EmployeeModel>> GetListEmployee()
        {
            var listEntity = await _employeeRepository.GetAllAsync(c => c.JobTitleID == 12);
            try
            {
                listEntity.OrderBy(c => int.Parse(c.EmployeeCode));
            }
            catch
            {
                
            }
            var mapList = _mapper.Map<IEnumerable<EmployeeModel>>(listEntity.OrderBy(c => c.EmployeeCode));
            return mapList;
        }
    }
}

