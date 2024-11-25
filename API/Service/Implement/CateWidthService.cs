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
    public class CateWidthService : ICateWidthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateWidth> _cateWidthService;
        private readonly IMapper _mapper;
        public CateWidthService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateWidthService = _unitOfWork.CateWidthRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateWidthModel wModel)
        {
            var _mapping = _mapper.Map<CateWidth>(wModel);
            try
            {
                await _cateWidthService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = wModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = wModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(string id, CateWidthModel wModel)
        {
            try
            {
                var map = _mapper.Map<CateWidth>(wModel);
                if (id != wModel.WidthID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateWidthService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = wModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = wModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateWidthService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateWidthService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateWidthModel>> GetAll()
        {
            var listEntity = await _cateWidthService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateWidthModel>>(listEntity);
            return mapList;
        }
        public async Task<IEnumerable<CateWidthModel>> GetWidthByType(string typeCode)
        {
            var listEntity = await _cateWidthService.GetAllAsync(c=>c.WidthType == typeCode);
            var mapList = _mapper.Map<IEnumerable<CateWidthModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateWidthService.GetAsync(id);
            var entityMapped = _mapper.Map<CateWidthModel>(entity);
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
