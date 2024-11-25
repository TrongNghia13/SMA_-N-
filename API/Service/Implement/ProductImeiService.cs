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
    public class ProductImeiService : IProductImeiService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<ProductImei> _ProductImeiService;
        private readonly IMapper _mapper;
        private readonly IRepository<ReceiptDetail> _receiptDetailService;
        public ProductImeiService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _ProductImeiService = _unitOfWork.ProductImeiRepository;
            _mapper = mapper;
            _receiptDetailService = _unitOfWork.ReceiptDetailRepository;
        }

        public async Task<ApiResponeModel> Create(ProductImeiModel ProductImeiModel)
        {
            var _mapping = _mapper.Map<ProductImei>(ProductImeiModel);
            try
            {
                await _ProductImeiService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = ProductImeiModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = ProductImeiModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, ProductImeiModel ProductImeiModel)
        {
            try
            {
                var map = _mapper.Map<ProductImei>(ProductImeiModel);
                if (id != ProductImeiModel.ProductImeiID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _ProductImeiService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = ProductImeiModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = ProductImeiModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _ProductImeiService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _ProductImeiService.DeleteAsync(value);
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

        public async Task<IEnumerable<ProductImeiModel>> GetAll()
        {
            var listEntity = await _ProductImeiService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<ProductImeiModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _ProductImeiService.GetAsync(c => c.ProductImeiID == id);
            var entityMapped = _mapper.Map<ProductImeiModel>(entity);
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
            var entity = new ProductImei();
            if(imei.Length == 12)
            {
                entity = await _ProductImeiService.GetAsync(c => c.Imei.Contains(imei) && c.ProductID!.Contains("CUON"));

            } 
            else
            {
                entity = await _ProductImeiService.GetAsync(c => c.Imei == imei && c.ProductID!.Contains("CUON"));

            } 
            var entityMapped = _mapper.Map<ProductImeiModel>(entity);
            if (entityMapped != null)
            {
                    return new ApiResponeModel
                    {
                        Data = entityMapped,
                        Success = true,
                        Message = "Get Successfully!"
                    };
            }
            return new ApiResponeModel
            {
                Success = false,
                Message = "ID Not Found!"
            };
        }
        public async Task<ApiResponeModel> GetTapeByImei(string imei)
        {
            var entity = await _ProductImeiService.GetAsync(c => c.Imei == imei && c.ProductID!.Contains("BANG"));
            var entityMapped = _mapper.Map<ProductImeiModel>(entity);
            if (entityMapped != null)
            {
                    return new ApiResponeModel
                    {
                        Data = entityMapped,
                        Success = true,
                        Message = "Get Successfully!"
                    };
            }
            return new ApiResponeModel
            {
                Success = false,
                Message = "ID Not Found!"
            };
        }
        public async Task<ApiResponeModel> GetProductByImei(string imei)
        {
            var entity = await _ProductImeiService.GetAsync(c => c.Imei == imei);
            var entityMapped = _mapper.Map<ProductImeiModel>(entity);
            if (entityMapped != null)
            {
                    return new ApiResponeModel
                    {
                        Data = entityMapped,
                        Success = true,
                        Message = "Get Successfully!"
                    };
            }
            return new ApiResponeModel
            {
                Success = false,
                Message = "ID Not Found!"
            };
        }
    }
}
