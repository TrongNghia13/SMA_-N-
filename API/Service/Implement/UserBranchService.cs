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
    public class UserBranchService : IUserBranchService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<UserBranch> _UserBranchService;
        private readonly IMapper _mapper;
        public UserBranchService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _UserBranchService = _unitOfWork.UserBranchRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> Create(UserBranchModel usbModel)
        {
            var _mapping = _mapper.Map<UserBranch>(usbModel);
            try
            {
                await _UserBranchService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = usbModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = usbModel,
                };
            }

        }
        public async Task<ApiResponeModel> Update(int id, UserBranchModel usbModel)
        {
            try
            {
                var map = _mapper.Map<UserBranch>(usbModel);
                if (id != usbModel.UserBranchID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _UserBranchService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = usbModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = usbModel,
                };
            }
        }
        public async Task<ApiResponeModel> Delete(int id)
        {
            var value = await _UserBranchService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _UserBranchService.DeleteAsync(value);
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
        public async Task<IEnumerable<UserBranchModel>> GetAll()
        {
            var listEntity = await _UserBranchService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<UserBranchModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(int id)
        {
            var entity = await _UserBranchService.GetAsync(id);
            var entityMapped = _mapper.Map<UserBranchModel>(entity);
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
