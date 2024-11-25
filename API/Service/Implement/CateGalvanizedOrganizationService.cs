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
    public class CateGalvanizedOrganizationService : ICateGalvanizedOrganizationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateGalvanizedOrganization> _CateGalvanizedOrganization;
        private readonly IMapper _mapper;

        public CateGalvanizedOrganizationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _CateGalvanizedOrganization = _unitOfWork.CateGalvanizedOrganizationRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CateGalvanizedOrganizationModel cateGalvanizedOrganizationModel)
        {
            var _mapping = _mapper.Map<CateGalvanizedOrganization>(cateGalvanizedOrganizationModel);
            try
            {
                await _CateGalvanizedOrganization.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateGalvanizedOrganizationModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateGalvanizedOrganizationModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(string id, CateGalvanizedOrganizationModel cateGalvanizedOrganizationModel)
        {
            try
            {
                var map = _mapper.Map<CateGalvanizedOrganization>(cateGalvanizedOrganizationModel);
                if (id != cateGalvanizedOrganizationModel.GalvanizedOrganizationID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _CateGalvanizedOrganization.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateGalvanizedOrganizationModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateGalvanizedOrganizationModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _CateGalvanizedOrganization.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _CateGalvanizedOrganization.DeleteAsync(value);
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

        public async Task<IEnumerable<CateGalvanizedOrganizationModel>> GetAll()
        {
            var listEntity = await _CateGalvanizedOrganization.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateGalvanizedOrganizationModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _CateGalvanizedOrganization.GetAsync(c=>c.GalvanizedOrganizationID==id);
            var entityMapped = _mapper.Map<CateGalvanizedOrganizationModel>(entity);
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
