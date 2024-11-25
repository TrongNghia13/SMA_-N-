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
    public class DeliveryDetailService : IDeliveryDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<DeliveryDetail> _deliveryDetailService;
        private readonly IMapper _mapper;

        public DeliveryDetailService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _deliveryDetailService = _unitOfWork.DeliveryDetailRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(DeliveryDetailModel deliveryDetailModel)
        {
            var _mapping = _mapper.Map<DeliveryDetail>(deliveryDetailModel);
            try
            {
                await _deliveryDetailService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = deliveryDetailModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = deliveryDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, DeliveryDetailModel deliveryDetailModel)
        {
            try
            {
                var map = _mapper.Map<DeliveryDetail>(deliveryDetailModel);
                if (id != deliveryDetailModel.DeliveryDetailID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _deliveryDetailService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = deliveryDetailModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = deliveryDetailModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _deliveryDetailService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _deliveryDetailService.DeleteAsync(value);
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

        public async Task<IEnumerable<DeliveryDetailModel>> GetAll()
        {
            var listEntity = await _deliveryDetailService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<DeliveryDetailModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _deliveryDetailService.GetAsync(c => c.DeliveryDetailID == id);
            var entityMapped = _mapper.Map<DeliveryDetailModel>(entity);
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


