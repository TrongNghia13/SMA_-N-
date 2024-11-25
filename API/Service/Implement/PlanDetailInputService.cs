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
    public class PlanDetailInputService : IPlanDetailInputService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<PlanDetailInput> _planDetailInputService;
        private readonly IMapper _mapper;

        public PlanDetailInputService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _planDetailInputService = _unitOfWork.PlanDetailInputRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(PlanDetailInputModel planDetailInputModel)
        {
            var _mapping = _mapper.Map<PlanDetailInput>(planDetailInputModel);
            try
            {
                await _planDetailInputService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = planDetailInputModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = planDetailInputModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, PlanDetailInputModel planDetailInputModel)
        {
            try
            {
                var map = _mapper.Map<PlanDetailInput>(planDetailInputModel);
                if (id != planDetailInputModel.PlanDetailInputID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _planDetailInputService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = planDetailInputModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = planDetailInputModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _planDetailInputService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _planDetailInputService.DeleteAsync(value);
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

        public async Task<IEnumerable<PlanDetailInputModel>> GetAll()
        {
            var listEntity = await _planDetailInputService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<PlanDetailInputModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _planDetailInputService.GetAsync(c => c.PlanDetailInputID == id);
            var entityMapped = _mapper.Map<PlanDetailInputModel>(entity);
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

        public async Task<ApiResponeModel> GetByPlanManuafacturingId(decimal id)
        {
            var entity = await _planDetailInputService.GetAllAsync(c => c.PlanManufacturingID == id);
            var entityMapped = _mapper.Map<IEnumerable<PlanDetailInputModel>>(entity);
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


