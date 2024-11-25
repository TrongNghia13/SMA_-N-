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
    public class CateCounterpartyService : ICateCounterpartyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateCounterparty> _CateCounterpartyRepository;
        private readonly IMapper _mapper;
        public CateCounterpartyService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _CateCounterpartyRepository = _unitOfWork.CateCounterpartyRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateCounterpartyModel ccModel)
        {
            var _mapping = _mapper.Map<CateCounterparty>(ccModel);
            ccModel.CreateDate = DateTime.Now;
            try
            {
                await _CateCounterpartyRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = ccModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = ccModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateCounterpartyModel ccModel)
        {
            try
            {
                var map = _mapper.Map<CateCounterparty>(ccModel);
                if (id != ccModel.CounterpartyID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _CateCounterpartyRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = ccModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = ccModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _CateCounterpartyRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _CateCounterpartyRepository.DeleteAsync(value);
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
        public async Task<IEnumerable<CateCounterpartyModel>> GetAll()
        {
            var listEntity = await _CateCounterpartyRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateCounterpartyModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _CateCounterpartyRepository.GetAsync(id);
            var entityMapped = _mapper.Map<CateCounterpartyModel>(entity);
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
        public async Task<IEnumerable<CateCounterpartyModel>> GetVendorByGroupId(string groupId)
        {
            var listEntity = await _CateCounterpartyRepository.GetAllAsync(c=>c.CounterpartyGroup == groupId);
            var mapList = _mapper.Map<IEnumerable<CateCounterpartyModel>>(listEntity);
            return mapList;
        }
        public async Task<IEnumerable<CateCounterpartyModel>> GetListCouterByTypeAndGroup(string typeId,string groupId)
        {
            var listEntity = await _CateCounterpartyRepository.GetAllAsync(c => c.CounterpartyGroup == groupId && c.CounterpartyType == typeId);
            var mapList = _mapper.Map<IEnumerable<CateCounterpartyModel>>(listEntity);
            return mapList;
        }
    }
}
