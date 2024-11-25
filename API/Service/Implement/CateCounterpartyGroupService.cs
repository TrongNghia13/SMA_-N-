using AutoMapper;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using DATA;
using DATA.Infastructure;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class CateCounterpartyGroupService : ICateCounterpartyGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateCounterpartyGroup> _cateCounterpartyGroupService;
        private readonly IMapper _mapper;
        public CateCounterpartyGroupService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateCounterpartyGroupService = _unitOfWork.CateCounterpartyGroupRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateCounterpartyGroupModel ccgModel)
        {
            var _mapping = _mapper.Map<CateCounterpartyGroup>(ccgModel);
            try
            {
                await _cateCounterpartyGroupService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = ccgModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = ccgModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateCounterpartyGroupModel ccgModel)
        {
            try
            {
                var map = _mapper.Map<CateCounterpartyGroup>(ccgModel);
                if (id != ccgModel.CounterpartyGroupID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateCounterpartyGroupService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = ccgModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = ccgModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateCounterpartyGroupService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateCounterpartyGroupService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateCounterpartyGroupModel>> GetAll()
        {
            var listEntity = await _cateCounterpartyGroupService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateCounterpartyGroupModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateCounterpartyGroupService.GetAsync(id);
            var entityMapped = _mapper.Map<CateCounterpartyGroupModel>(entity);
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
        public async Task<IEnumerable<CateCounterpartyGroupModel>> GetListCounterPartyGroup(string type, bool isChild)
        {
            var listEntity = await _cateCounterpartyGroupService.GetAllAsync(c=>c.CounterpartyType == type && c.IsChild == isChild);
            if(type == "0")
            {
                listEntity = await _cateCounterpartyGroupService.GetAllAsync();
            }
            var mapList = _mapper.Map<IEnumerable<CateCounterpartyGroupModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetListTreeGridCounterGroup(string? typeId)
        {
            var entity = await _cateCounterpartyGroupService.GetAllAsync();
            if(typeId != null && typeId.Trim().Length > 0)
            {
                entity = entity.Where(c => c.CounterpartyType == typeId).ToList();
            }
            List<string> listType = entity.Select(c => c.CounterpartyType).Distinct().ToList();
            List<CateCounterpartyGroupTreeDataModel> cateCounterpartyGroupTreeDataModels = new List<CateCounterpartyGroupTreeDataModel>();
            for(int i = 0; i < listType.Count; i++)
            {
                var entityOfType = await _cateCounterpartyGroupService.GetAllAsync(c=>c.CounterpartyType.Equals(listType[i]));
                var mappedEntity = _mapper.Map<List<CateCounterpartyGroupTreeDataModel>>(entityOfType);
                cateCounterpartyGroupTreeDataModels.Add(new CateCounterpartyGroupTreeDataModel
                {
                    Key = listType[i],
                    Children = mappedEntity
                });
            }
            if (cateCounterpartyGroupTreeDataModels == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = cateCounterpartyGroupTreeDataModels,
                Success = true,
                Message = "Get Successfully!"
            };
        }
    }
}
