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
using Model;

namespace Service.Implement
{
    public class CateJobTitleService : ICateJobTitleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateJobTitle> _CateJobTitle;
        private readonly IMapper _mapper;

        public CateJobTitleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _CateJobTitle = _unitOfWork.CateJobTitleRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CateJobTitleModel cateJobTitleModel)
        {
            var _mapping = _mapper.Map<CateJobTitle>(cateJobTitleModel);
            try
            {
                await _CateJobTitle.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateJobTitleModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateJobTitleModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(int id, CateJobTitleModel cateJobTitleModel)
        {
            try
            {
                var map = _mapper.Map<CateJobTitle>(cateJobTitleModel);
                if (id != cateJobTitleModel.JobTitleID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _CateJobTitle.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateJobTitleModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateJobTitleModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _CateJobTitle.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _CateJobTitle.DeleteAsync(value);
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

        public async Task<IEnumerable<CateJobTitleModel>> GetAll()
        {
            var listEntity = await _CateJobTitle.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateJobTitleModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _CateJobTitle.GetAsync(c => c.JobTitleID == id);
            var entityMapped = _mapper.Map<CateJobTitleModel>(entity);
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
