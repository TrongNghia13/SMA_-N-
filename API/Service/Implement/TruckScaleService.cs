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
    public class TruckScaleService : ITruckScaleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<TruckScale> _truckScaleService;
        private readonly IMapper _mapper;

        public TruckScaleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _truckScaleService = _unitOfWork.TruckScaleRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(TruckScaleModel truckScaleModel)
        {
            var _mapping = _mapper.Map<TruckScale>(truckScaleModel);
            try
            {
                await _truckScaleService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = truckScaleModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = truckScaleModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, TruckScaleModel truckScaleModel)
        {
            try
            {
                var map = _mapper.Map<TruckScale>(truckScaleModel);
                if (id != truckScaleModel.TruckScaleID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _truckScaleService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = truckScaleModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = truckScaleModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _truckScaleService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _truckScaleService.DeleteAsync(value);
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

        public async Task<IEnumerable<TruckScaleModel>> GetAll()
        {
            var listEntity = await _truckScaleService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<TruckScaleModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _truckScaleService.GetAsync(c => c.TruckScaleID == id);
            var entityMapped = _mapper.Map<TruckScaleModel>(entity);
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


