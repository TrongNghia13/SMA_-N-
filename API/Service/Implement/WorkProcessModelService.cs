using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DATA.Infastructure;
using DATA;
using Service.Interface;
using Model.Models;

namespace Service.Implement
{
    public class WorkProcessService : IWorkProcessService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<WorkProcess> _WorkProcess;
        private readonly IMapper _mapper;

        public WorkProcessService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _WorkProcess = _unitOfWork.WorkProcessRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(WorkProcessModel WorkProcessModel)
        {
            var _mapping = _mapper.Map<WorkProcess>(WorkProcessModel);
            try
            {
                await _WorkProcess.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = WorkProcessModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = WorkProcessModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(string id, WorkProcessModel WorkProcessModel)
        {
            try
            {
                var map = _mapper.Map<WorkProcess>(WorkProcessModel);
                if (id != WorkProcessModel.WorkProcessID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _WorkProcess.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = WorkProcessModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = WorkProcessModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _WorkProcess.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _WorkProcess.DeleteAsync(value);
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

        public async Task<IEnumerable<WorkProcessModel>> GetAll()
        {
            var listEntity = await _WorkProcess.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<WorkProcessModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _WorkProcess.GetAsync(c => c.WorkProcessID == id);
            var entityMapped = _mapper.Map<WorkProcessModel>(entity);
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
