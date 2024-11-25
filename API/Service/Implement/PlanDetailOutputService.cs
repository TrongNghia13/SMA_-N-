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
    public class PlanDetailOutputService : IPlanDetailOutputService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<PlanDetailOutput> _planDetailOutputService;
        private readonly IMapper _mapper;

        public PlanDetailOutputService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _planDetailOutputService = _unitOfWork.PlanDetailOutputRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(PlanDetailOutputModel planDetailOutputModel)
        {
            var _mapping = _mapper.Map<PlanDetailOutput>(planDetailOutputModel);
            try
            {
                await _planDetailOutputService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = planDetailOutputModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = planDetailOutputModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, PlanDetailOutputModel planDetailOutputModel)
        {
            try
            {
                var map = _mapper.Map<PlanDetailOutput>(planDetailOutputModel);
                if (id != planDetailOutputModel.PlanDetailOutputID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _planDetailOutputService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = planDetailOutputModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = planDetailOutputModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _planDetailOutputService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _planDetailOutputService.DeleteAsync(value);
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

        public async Task<IEnumerable<PlanDetailOutputModel>> GetAll()
        {
            var listEntity = await _planDetailOutputService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<PlanDetailOutputModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _planDetailOutputService.GetAllAsync(c => c.PlanDetailInputID == id);
            var entityMapped = _mapper.Map<IEnumerable<PlanDetailOutputModel>>(entity);
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

        public async Task<ApiResponeModel> GetByMaNuaFacturingID(decimal id)
        {
            var entity = await _planDetailOutputService.GetAllAsync(c => c.PlanManufacturingID == id);
            var entityMapped = _mapper.Map<IEnumerable<PlanDetailOutputModel>>(entity);
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


