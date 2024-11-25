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
    public class BeginningInventoryService : IBeginningInventoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<BeginningInventory> _beginningInventoryService;
        private readonly IMapper _mapper;

        public BeginningInventoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _beginningInventoryService = _unitOfWork.BeginningInventoryRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(BeginningInventoryModel beginningInventoryModel)
        {
            var _mapping = _mapper.Map<BeginningInventory>(beginningInventoryModel);
            try
            {
                await _beginningInventoryService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = beginningInventoryModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = beginningInventoryModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, BeginningInventoryModel beginningInventoryModel)
        {
            try
            {
                var map = _mapper.Map<BeginningInventory>(beginningInventoryModel);
                if (id != beginningInventoryModel.BeginningInventoryID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _beginningInventoryService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = beginningInventoryModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = beginningInventoryModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _beginningInventoryService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _beginningInventoryService.DeleteAsync(value);
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

        public async Task<IEnumerable<BeginningInventoryModel>> GetAll()
        {
            var listEntity = await _beginningInventoryService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<BeginningInventoryModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _beginningInventoryService.GetAsync(c => c.BeginningInventoryID == id);
            var entityMapped = _mapper.Map<BeginningInventoryModel>(entity);
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


