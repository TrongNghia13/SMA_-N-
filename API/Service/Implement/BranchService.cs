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
    public class BranchService : IBranchService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Branch> _BranchService;
        private readonly IMapper _mapper;
        public BranchService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _BranchService = _unitOfWork.BranchRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(BranchModel cctModel)
        {
            var _mapping = _mapper.Map<Branch>(cctModel);
            try
            {
                await _BranchService.CreateAsync(_mapping);
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
        public async Task<ApiResponeModel> Update(string id, BranchModel cctModel)
        {
            try
            {
                var map = _mapper.Map<Branch>(cctModel);
                if (id != cctModel.BranchID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _BranchService.UpdateAsync(map);
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
            var value = await _BranchService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _BranchService.DeleteAsync(value);
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
        public async Task<IEnumerable<BranchModel>> GetAll()
        {
            var listEntity = await _BranchService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<BranchModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            var entity = await _BranchService.GetAsync(id);
            var entityMapped = _mapper.Map<BranchModel>(entity);
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
