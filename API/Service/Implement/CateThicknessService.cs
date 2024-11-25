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
    public class CateThicknessService : ICateThicknessService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateThickness> _cateThicknessService;
        private readonly IMapper _mapper;
        public CateThicknessService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateThicknessService = _unitOfWork.CateThicknessRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(CateThicknessModel cctModel)
        {
            var _mapping = _mapper.Map<CateThickness>(cctModel);
            try
            {
                await _cateThicknessService.CreateAsync(_mapping);
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
        public async Task<ApiResponeModel> Update(string id, CateThicknessModel cctModel)
        {
            try
            {
                var map = _mapper.Map<CateThickness>(cctModel);
                if (id != cctModel.ThicknessID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateThicknessService.UpdateAsync(map);
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
            var value = await _cateThicknessService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateThicknessService.DeleteAsync(value);
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
        public async Task<IEnumerable<CateThicknessModel>> GetAll()
        {
            var listEntity = await _cateThicknessService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateThicknessModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateThicknessService.GetAsync(id);
            var entityMapped = _mapper.Map<CateThicknessModel>(entity);
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
