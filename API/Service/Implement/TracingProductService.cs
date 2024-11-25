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
    public class TracingProductService : ITracingProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<TracingProduct> _tracingProduct;
        private readonly IMapper _mapper;

        public TracingProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _tracingProduct = _unitOfWork.TracingProductRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(TracingProductModel tracingProductModel)
        {
            var _mapping = _mapper.Map<TracingProduct>(tracingProductModel);
            try
            {
                await _tracingProduct.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = tracingProductModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = tracingProductModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, TracingProductModel tracingProductModel)
        {
            try
            {
                var map = _mapper.Map<TracingProduct>(tracingProductModel);
                if (id != tracingProductModel.TracingProductID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _tracingProduct.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = tracingProductModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = tracingProductModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _tracingProduct.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _tracingProduct.DeleteAsync(value);
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

        public async Task<IEnumerable<TracingProductModel>> GetAll()
        {
            var listEntity = await _tracingProduct.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<TracingProductModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _tracingProduct.GetAsync(c => c.TracingProductID == id);
            var entityMapped = _mapper.Map<TracingProductModel>(entity);
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


