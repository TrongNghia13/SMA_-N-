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
    public class CateManufacturingProcessService : ICateManufacturingProcessService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateManufacturingProcess> _CateManufacturingProcess;
        private readonly IMapper _mapper;

        public CateManufacturingProcessService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _CateManufacturingProcess = _unitOfWork.CateManufacturingProcessRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CateManufacturingProcessModel cateManufacturingProcessModel)
        {
            var _mapping = _mapper.Map<CateManufacturingProcess>(cateManufacturingProcessModel);
            try
            {
                await _CateManufacturingProcess.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateManufacturingProcessModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateManufacturingProcessModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(string id, CateManufacturingProcessModel cateManufacturingProcessModel)
        {
            try
            {
                var map = _mapper.Map<CateManufacturingProcess>(cateManufacturingProcessModel);
                if (id != cateManufacturingProcessModel.ManufacturingProcessID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _CateManufacturingProcess.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateManufacturingProcessModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateManufacturingProcessModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _CateManufacturingProcess.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _CateManufacturingProcess.DeleteAsync(value);
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

        public async Task<IEnumerable<CateManufacturingProcessModel>> GetAll()
        {
            var listEntity = await _CateManufacturingProcess.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateManufacturingProcessModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _CateManufacturingProcess.GetAsync(c => c.ManufacturingProcessID== id);
            var entityMapped = _mapper.Map<CateManufacturingProcessModel>(entity);
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
