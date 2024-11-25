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
    public class CateReceiptNoService : ICateReceiptNoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateReceiptNo> _cateReceiptNoService;
        private readonly IMapper _mapper;

        public CateReceiptNoService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateReceiptNoService = _unitOfWork.CateReceiptNoRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CateReceiptNoModel cateReceiptNoModel)
        {
            var _mapping = _mapper.Map<CateReceiptNo>(cateReceiptNoModel);
            try
            {
                await _cateReceiptNoService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateReceiptNoModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateReceiptNoModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(string id, CateReceiptNoModel cateReceiptNoModel)
        {
            try
            {
                var map = _mapper.Map<CateReceiptNo>(cateReceiptNoModel);
                if (id != cateReceiptNoModel.ReceiptNo)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateReceiptNoService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateReceiptNoModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateReceiptNoModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _cateReceiptNoService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateReceiptNoService.DeleteAsync(value);
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

        public async Task<IEnumerable<CateReceiptNoModel>> GetAll()
        {
            var listEntity = await _cateReceiptNoService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateReceiptNoModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _cateReceiptNoService.GetAsync(c => c.ReceiptNo == id);
            var entityMapped = _mapper.Map<CateReceiptNoModel>(entity);
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


