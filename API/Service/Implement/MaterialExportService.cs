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
    public class MaterialExportService : IMaterialExportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<MaterialExport> _materialExport;
        private readonly IMapper _mapper;

        public MaterialExportService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _materialExport = _unitOfWork.MaterialExportRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(MaterialExportModel materialExportModel)
        {
            var _mapping = _mapper.Map<MaterialExport>(materialExportModel);
            try
            {
                await _materialExport.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = materialExportModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = materialExportModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, MaterialExportModel materialExportModel)
        {
            try
            {
                var map = _mapper.Map<MaterialExport>(materialExportModel);
                if (id != materialExportModel.MaterialExportID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _materialExport.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = materialExportModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = materialExportModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _materialExport.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _materialExport.DeleteAsync(value);
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

        public async Task<IEnumerable<MaterialExportModel>> GetAll()
        {
            var listEntity = await _materialExport.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<MaterialExportModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _materialExport.GetAsync(c => c.MaterialExportID == id);
            var entityMapped = _mapper.Map<MaterialExportModel>(entity);
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


