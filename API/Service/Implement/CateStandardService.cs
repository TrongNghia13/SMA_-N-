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
    public class CateStandardService : ICateStandardService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateStandard> _cateStandardService;
        private readonly IMapper _mapper;
        public CateStandardService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateStandardService = _unitOfWork.CateStandardRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateStandardModel cctModel)
        {
            var _mapping = _mapper.Map<CateStandard>(cctModel);
            try
            {
                await _cateStandardService.CreateAsync(_mapping);
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
        public async Task<ApiResponeModel> Update(string id, CateStandardModel cctModel)
        {
            try
            {
                var map = _mapper.Map<CateStandard>(cctModel);
                if (id != cctModel.StandardID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateStandardService.UpdateAsync(map);
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
            var value = await _cateStandardService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateStandardService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateStandardModel>> GetAll()
        {
            var listEntity = await _cateStandardService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateStandardModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateStandardService.GetAsync(id);
            var entityMapped = _mapper.Map<CateStandardModel>(entity);
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
