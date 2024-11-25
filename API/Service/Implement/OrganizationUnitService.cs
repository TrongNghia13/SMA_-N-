using DATA.Infastructure;
using DATA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Service.Interface;
using Model.Models;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json.Linq;

namespace Service.Implement
{
    public class OrganizationUnitService : IOrganizationUnit
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<OrganizationUnit> _OrganizationUnitRepository;
        private readonly IRepository<OrganizationUnitType> _OrganizationUnitTypeRepository;

        private readonly IMapper _mapper;

        public OrganizationUnitService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _OrganizationUnitRepository = _unitOfWork.OrganizationUnitRepository;
            _OrganizationUnitTypeRepository = _unitOfWork.OrganizationUnitTypeRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(OrganizationUnitModel organizationUnitModel)
        {
            var _mapping = _mapper.Map<OrganizationUnit>(organizationUnitModel);
            try
            {
                await _OrganizationUnitRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = organizationUnitModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = organizationUnitModel,
                };
            }

        }


        public async Task<ApiResponeModel> Update(int id, OrganizationUnitModel organizationUnitModel)
        {
            try
            {
                var map = _mapper.Map<OrganizationUnit>(organizationUnitModel);
                if (id != organizationUnitModel.OrganizationUnitID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _OrganizationUnitRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = organizationUnitModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = organizationUnitModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _OrganizationUnitRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _OrganizationUnitRepository.DeleteAsync(value);
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

        public async Task<IEnumerable<OrganizationUnitModel>> GetAll()
        {
            var listEntity = await _OrganizationUnitRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<OrganizationUnitModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _OrganizationUnitRepository.GetAsync(id);
            var entityMapped = _mapper.Map<OrganizationUnitModel>(entity);
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
                string idFake = entity[i].OrganizationUnitTypeID.ToString() + "mainID";
                var entityDetail = await _OrganizationUnitRepository.GetAllAsync(c => c.OrganizationUnitTypeID == entity[i].OrganizationUnitTypeID && c.IsParent == true);
                List<TreeData> td = new List<TreeData>();
                for (int j = 0; j < entityDetail.Count; j++)
                {
                    TreeData entity1 = new TreeData();
                    entity1.Key = entityDetail[j].OrganizationUnitID.ToString();
                    entity1.Value = entityDetail[j].OrganizationUnitID.ToString();
                    entity1.Title = entityDetail[j].OrganizationUnitName ?? " ";
                    entity1.AttrData = JsonSerializer.Serialize(
                               new
                               {
                                   entityDetail[j].Phone,
                                   entityDetail[j].IsParent,
                                   entityDetail[j].CompanyOwnerName,
                                   entityDetail[j].OrganizationUnitTypeID,
                               }
                            );
                    entity1.Children =new List<TreeData>();
                    td.Add(entity1);
                }
                TreeData entity2 = new TreeData();
                entity2.Key = idFake;
                entity2.Value = idFake;
                entity2.Title = entity[i].OrganizationUnitTypeName ?? "";
                entity2.Children = td;
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
        public async Task<ApiResponeModel> GetDataShowTreeGrid()
        {
            var entity = await _OrganizationUnitRepository.GetAllAsync();
            List<OrganizationUnitTreeTable> treeMain = new List<OrganizationUnitTreeTable>();
            List<int?> listType = entity.Select(c => c.OrganizationUnitTypeID).Distinct().ToList();
            for (int i = 0; i < listType.Count; i++)
            {
                var entityDetail = await _OrganizationUnitRepository.GetAllAsync(c => c.OrganizationUnitTypeID == listType[i]);
                var mapped = _mapper.Map<List<OrganizationUnitTreeTable>>(entityDetail);
                treeMain.Add(new OrganizationUnitTreeTable
                {
                    Key = listType[i].ToString(),
                    children = mapped,
                });
            }
            return new ApiResponeModel
            {
                Data = treeMain,
                Success = true,
                Message = "Get Successfully!"
            };
        }
    }
}
