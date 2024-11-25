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
    public class ReceiptImeiService : IReceiptImeiService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<ReceiptImei> _receiptImeiService;
        private readonly IMapper _mapper;
        private readonly IRepository<ReceiptDetail> _receiptDetailService;
        public ReceiptImeiService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _receiptImeiService = _unitOfWork.ReceiptImeiRepository;
            _mapper = mapper;
            _receiptDetailService = _unitOfWork.ReceiptDetailRepository;
        }

        public async Task<ApiResponeModel> Create(ReceiptImeiModel receiptImeiModel)
        {
            var _mapping = _mapper.Map<ReceiptImei>(receiptImeiModel);
            try
            {
                await _receiptImeiService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = receiptImeiModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = receiptImeiModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, ReceiptImeiModel receiptImeiModel)
        {
            try
            {
                var map = _mapper.Map<ReceiptImei>(receiptImeiModel);
                if (id != receiptImeiModel.ReceiptImeiID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _receiptImeiService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = receiptImeiModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = receiptImeiModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _receiptImeiService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _receiptImeiService.DeleteAsync(value);
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

       

        public async Task<IEnumerable<ReceiptImeiModel>> GetAll()
        {
            var listEntity = await _receiptImeiService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<ReceiptImeiModel>>(listEntity);
            return mapList;
        }

        public async Task<IEnumerable<ReceiptImei>> DeleteReceiptImeiByReceiptDetailId(decimal ReceipDetailImei)
        {
            var listEntity = await _receiptImeiService.GetAllAsync(x=>x.ReceiptDetailID==ReceipDetailImei);        
            await _receiptImeiService.DeleteRangeAsync(listEntity.ToList());
            return listEntity;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _receiptImeiService.GetAsync(c => c.ReceiptImeiID == id);
            var entityMapped = _mapper.Map<ReceiptImeiModel>(entity);
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
        public async Task<ApiResponeModel> GetRollByImei(string imei)
        {
            var entity = await _receiptImeiService.GetAsync(c => c.Imei == imei);
            var entityMapped = _mapper.Map<ReceiptImeiModel>(entity);
            if (entityMapped != null)
            {
                var receiptDetailValue = await _receiptDetailService.GetAsync(c => c.ProductID.ToUpper().Trim().Contains("CUON") && c.ReceiptDetailID == entity.ReceiptDetailID);
                if (receiptDetailValue != null)
                {
                    return new ApiResponeModel
                    {
                        Data = entityMapped,
                        Success = true,
                        Message = "Get Successfully!"
                    };
                }
            }
            return new ApiResponeModel
            {
                Success = false,
                Message = "ID Not Found!"
            };
        }
        public async Task<ApiResponeModel> GetTapeByImei(string imei)
        {
            var entity = await _receiptImeiService.GetAsync(c => c.Imei == imei);
            var entityMapped = _mapper.Map<ReceiptImeiModel>(entity);
            if (entityMapped != null)
            {
                var receiptDetailValue = await _receiptDetailService.GetAsync(c => c.ProductID.ToUpper().Trim().Contains("BANG") && c.ReceiptDetailID == entity.ReceiptDetailID);
                if (receiptDetailValue != null)
                {
                    return new ApiResponeModel
                    {
                        Data = entityMapped,
                        Success = true,
                        Message = "Get Successfully!"
                    };
                }
            }
            return new ApiResponeModel
            {
                Success = false,
                Message = "ID Not Found!"
            };
        }
    }
}
