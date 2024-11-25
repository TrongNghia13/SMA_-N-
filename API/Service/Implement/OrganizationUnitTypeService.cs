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
using System.Text.Json;

namespace Service.Implement
{
    public class OrganizationUnitTypeService : IOrganizationUnitType
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<OrganizationUnitType> _OrganizationUnitTypeRepository;
        private readonly IMapper _mapper;

        public OrganizationUnitTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _OrganizationUnitTypeRepository = _unitOfWork.OrganizationUnitTypeRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(OrganizationUnitTypeModel OrganizationUnitTypeModel)
        {

            var _mapping = _mapper.Map<OrganizationUnitType>(OrganizationUnitTypeModel);
            try
            {
                await _OrganizationUnitTypeRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = OrganizationUnitTypeModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = OrganizationUnitTypeModel,
                };
            }
        }


        public async Task<ApiResponeModel> Update(int id, OrganizationUnitTypeModel organizationUnitTypeModel)
        {
            try
            {
                var map = _mapper.Map<OrganizationUnitType>(organizationUnitTypeModel);
                if (id != organizationUnitTypeModel.OrganizationUnitTypeID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _OrganizationUnitTypeRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = organizationUnitTypeModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = organizationUnitTypeModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _OrganizationUnitTypeRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _OrganizationUnitTypeRepository.DeleteAsync(value);
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

        public async Task<IEnumerable<OrganizationUnitTypeModel>> GetAll()
        {
            var listEntity = await _OrganizationUnitTypeRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<OrganizationUnitTypeModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _OrganizationUnitTypeRepository.GetAsync(id);
            var entityMapped = _mapper.Map<OrganizationUnitTypeModel>(entity);
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
        public async Task<ApiResponeModel> GetDataShowTreeSelect()
        {
            var entityGet = await _OrganizationUnitTypeRepository.GetAllAsync();
            List<OrganizationUnitType> entity = entityGet.ToList();
            List<TreeData> treeMain = new List<TreeData>();
            for (int i = 0; i < entity.Count; i++)
            {
                TreeData entity2 = new TreeData();
                entity2.Key = entity[i].OrganizationUnitTypeID.ToString();
                entity2.Value = entity[i].OrganizationUnitTypeID.ToString();
                entity2.Title = entity[i].OrganizationUnitTypeName ?? "";
                entity2.AttrData = JsonSerializer.Serialize(
                              new
                              {
                                  entity[i].Description
                              }
                           );
                treeMain.Add(entity2);

            }
            return new ApiResponeModel
            {
                Status = 200,
                Data = treeMain,
                Success = true,
                Message = "Get Successfully!"
            };
        }
    }
}
