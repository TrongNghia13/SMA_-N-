using AutoMapper;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using DATA;
using DATA.Infastructure;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class CateSteelTypeService : ICateSteelTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateSteelType> _cateSteelTypeService;
        private readonly IMapper _mapper;
        public CateSteelTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateSteelTypeService = _unitOfWork.CateSteelTypeRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateSteelTypeModel cctModel)
        {
            var _mapping = _mapper.Map<CateSteelType>(cctModel);
            try
            {
                await _cateSteelTypeService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cctModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cctModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateSteelTypeModel cctModel)
        {
            try
            {
                var map = _mapper.Map<CateSteelType>(cctModel);
                if (id != cctModel.SteelTypeID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateSteelTypeService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cctModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cctModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateSteelTypeService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateSteelTypeService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateSteelTypeModel>> GetAll()
        {
            var listEntity = await _cateSteelTypeService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateSteelTypeModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateSteelTypeService.GetAsync(id);
            var entityMapped = _mapper.Map<CateSteelTypeModel>(entity);
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
