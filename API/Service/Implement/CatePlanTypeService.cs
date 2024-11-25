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
    public class CatePlanTypeService : ICatePlanTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CatePlanType> _catePlanType;
        private readonly IMapper _mapper;

        public CatePlanTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _catePlanType = _unitOfWork.CatePlanTypeRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CatePlanTypeModel catePlanTypeModel)
        {
            var _mapping = _mapper.Map<CatePlanType>(catePlanTypeModel);
            try
            {
                await _catePlanType.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = catePlanTypeModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = catePlanTypeModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(string id, CatePlanTypeModel catePlanTypeModel)
        {
            try
            {
                var map = _mapper.Map<CatePlanType>(catePlanTypeModel);
                if (id != catePlanTypeModel.PlanTypeID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _catePlanType.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = catePlanTypeModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = catePlanTypeModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _catePlanType.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _catePlanType.DeleteAsync(value);
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

        public async Task<IEnumerable<CatePlanTypeModel>> GetAll()
        {
            var listEntity = await _catePlanType.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CatePlanTypeModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _catePlanType.GetAsync(c => c.PlanTypeID == id);
            var entityMapped = _mapper.Map<CatePlanTypeModel>(entity);
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

