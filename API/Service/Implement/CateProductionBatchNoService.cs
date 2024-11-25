using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Service.Interface;

namespace Service.Implement
{
    public class CateProductionBatchNoService: ICateProductionBatchNoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateProductionBatchNo> _cateProductionBatchNo;
        private readonly IMapper _mapper;
        public CateProductionBatchNoService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateProductionBatchNo = _unitOfWork.CateProductionBatchNoRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateProductionBatchNoModel cateProductionBatchNoModel)
        {
            var _mapping = _mapper.Map<CateProductionBatchNo>(cateProductionBatchNoModel);
            try
            {
                await _cateProductionBatchNo.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateProductionBatchNoModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateProductionBatchNoModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateProductionBatchNoModel cateProductionBatchNoModel)
        {
            try
            {
                var map = _mapper.Map<CateProductionBatchNo>(cateProductionBatchNoModel);
                if (id != cateProductionBatchNoModel.ProductionBatchNoID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateProductionBatchNo.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateProductionBatchNoModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateProductionBatchNoModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateProductionBatchNo.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateProductionBatchNo.DeleteAsync(value);
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
        public async Task<IEnumerable<CateProductionBatchNoModel>> GetAll()
        {
            var listEntity = await _cateProductionBatchNo.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateProductionBatchNoModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateProductionBatchNo.GetAsync(c=>c.ProductionBatchNoID==id);
            var entityMapped = _mapper.Map<CateProductionBatchNoModel>(entity);
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
    }
}
