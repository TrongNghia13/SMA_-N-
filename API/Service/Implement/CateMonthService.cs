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
    public class CateMonthService : ICateMonthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateMonth> _CateMonth;
        private readonly IMapper _mapper;

        public CateMonthService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _CateMonth = _unitOfWork.CateMonthRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CateMonthModel cateMonthModel)
        {
            var _mapping = _mapper.Map<CateMonth>(cateMonthModel);
            try
            {
                await _CateMonth.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateMonthModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateMonthModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(CateMonthModel cateMonthModel)
        {
            try
            {
                var map = _mapper.Map<CateMonth>(cateMonthModel);
                    await _CateMonth.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Status = 200,
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateMonthModel
                    };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Status = 500,
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateMonthModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(string id)
        {
            var value = await _CateMonth.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _CateMonth.DeleteAsync(value);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Status = 200,
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

        public async Task<IEnumerable<CateMonthModel>> GetAll()
        {
            var listEntity = await _CateMonth.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<CateMonthModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _CateMonth.GetAsync(c => c.MonthID == id);
            var entityMapped = _mapper.Map<CateMonthModel>(entity);
            if (entityMapped == null)
            {
                return new ApiResponeModel
                {
                    Status = 404,
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Status = 200,
                Data = entityMapped,
                Success = true,
                Message = "Get Successfully!"
            };
        }
        public async Task<ApiResponeModel> CheckMonthIsOpen(string receiptDate)
        {
            try
            {
                var entity = await _CateMonth.GetAsync(c => c.MonthID == receiptDate && c.IsLock == false);
            var entityMapped = _mapper.Map<CateMonthModel>(entity);
            if (entityMapped == null)
            {
                    return new ApiResponeModel
                    {
                        Status = 200,
                        Success = true,
                        Message = "",
                        Data = false
                };
            }
            return new ApiResponeModel
            {
                Status = 200,
                Data = true,
                Success = true,
                Message = ""
            };
            }
            catch
            {
                return new ApiResponeModel
                {
                    Status = 0,
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
        }
    }
}
