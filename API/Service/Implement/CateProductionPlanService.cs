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
    public class CateProductionPlanService : ICateProductionPlanService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateProductionPlan> _cateProductionPlanService;
        private readonly IMapper _mapper;

        public CateProductionPlanService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateProductionPlanService = _unitOfWork.CateProductionPlanRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(CateProductionPlanModel cateProductionPlanModel)
        {
   
            var planNo = await GetPlanNo(cateProductionPlanModel.PlanDate.ToString(), cateProductionPlanModel.PlanTypeID, cateProductionPlanModel.BranchID);
            cateProductionPlanModel.PlanNo =planNo.Data.ToString();
            var _mapping = _mapper.Map<CateProductionPlan>(cateProductionPlanModel);
            try
            {
                await _cateProductionPlanService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = cateProductionPlanModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = cateProductionPlanModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(string id, CateProductionPlanModel cateProductionPlanModel)
        {
            try
            {
                id = Uri.UnescapeDataString(id);
                var map = _mapper.Map<CateProductionPlan>(cateProductionPlanModel);
                if (id != cateProductionPlanModel.ProductionPlanID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _cateProductionPlanService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = cateProductionPlanModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = cateProductionPlanModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(string id)
        {
            id = Uri.UnescapeDataString(id);
            var value = await _cateProductionPlanService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _cateProductionPlanService.DeleteAsync(value);
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

        public async Task<IEnumerable<CateProductionPlanModel>> GetListPlanNotFinishByBranchId(string branchId)
        {
            var listEntity = await _cateProductionPlanService.GetAllAsync(p => p.BranchID == branchId && p.IsFinish == false);
            var mapList = _mapper.Map<IEnumerable<CateProductionPlanModel>>(listEntity);
            return mapList;
        }
        public async Task<IEnumerable<CateProductionPlanModel>> GetListPlanFinishByBranchId(string branchId)
        {
            var listEntity = await _cateProductionPlanService.GetAllAsync(p => p.BranchID == branchId && p.IsFinish == true);
            var mapList = _mapper.Map<IEnumerable<CateProductionPlanModel>>(listEntity);
            return mapList;
        }
        public async Task<IEnumerable<CateProductionPlanModel>> GetListPlanByBranchId(string branchId)
        {
            var listEntity = await _cateProductionPlanService.GetAllAsync(p => p.BranchID == branchId);
            var mapList = _mapper.Map<IEnumerable<CateProductionPlanModel>>(listEntity);
            return mapList;
        }
        public async Task<ApiResponeModel> GetById(string id)
        {
            id = Uri.UnescapeDataString(id);
            var entity = await _cateProductionPlanService.GetAsync(c => c.ProductionPlanID == id);
            var entityMapped = _mapper.Map<CateProductionPlanModel>(entity);
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

        public async Task<ApiResponeModel> GetPlanNo(string planDate, string plantTypeId,string branchId)
        {
         
            try
            {
                var currentTime = DateTime.Parse(planDate);
                var lPlan = await _cateProductionPlanService.GetAllAsync(c => c.PlanDate.Value.Month == currentTime.Month
                                                                        && c.PlanDate.Value.Year==currentTime.Year
                                                                        && c.BranchID==branchId 
                                                                        && c.PlanTypeID==plantTypeId);

                var listPlanRollbyBranchId = lPlan.Select(l => l.BranchID == branchId && l.PlanTypeID == plantTypeId);

                if (lPlan.Count() == 0)
                {
                    return new ApiResponeModel()
                    { Success=true,
                        Status = 200,
                        Message = "Get Success !",
                        Data = "0001"
                    };
                }
                else
                {
                    var currentPlanNo = int.Parse(lPlan[(lPlan.Count() - 1)].PlanNo);
                    var planNo = (currentPlanNo + 1).ToString();
                    var newPlanNo = "";
                    for (int i = 0; i < 4 - planNo.Count(); i++)
                    {
                        newPlanNo += "0";
                    }
                    return new ApiResponeModel
                    { Success = true,
                        Status = 200,
                        Data = newPlanNo + planNo,
                        Message = "Get Susscess !"
                    };
                    
                }


            }

            catch (Exception ex)
            {

                return new ApiResponeModel
                {

                    Status = 0,
                    Success = false,
                    Message = ex.Message,
                    Data = ""
                };
            }

            return null;
        }


    }
}