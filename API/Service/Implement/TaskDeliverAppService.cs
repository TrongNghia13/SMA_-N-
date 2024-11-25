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
    public class TaskDeliverAppService : ITaskDeliverAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<TaskDeliverApp> _taskDeliverAppRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<CateProductionPlan> _cateProductionPlanRepository;
        private readonly IRepository<TaskDeliverDetail> _taskDeliverDetailRepository;
        private readonly IRepository<ProductImei> _productImeiRepository;
        private readonly IRepository<BeginningInventory> _beginningInventoryRepository;

        public TaskDeliverAppService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _taskDeliverAppRepository = _unitOfWork.TaskDeliverAppRepository;
            _cateProductionPlanRepository = _unitOfWork.CateProductionPlanRepository;
            _taskDeliverDetailRepository = _unitOfWork.TaskDeliverDetailRepository;
            _productImeiRepository = _unitOfWork.ProductImeiRepository;
            _beginningInventoryRepository = _unitOfWork.BeginningInventoryRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Create(TaskDeliverAppModel TaskDeliverAppModel)
        {
            var checkExistValue = await _taskDeliverAppRepository.GetAllAsync(c => c.ProductionPlanID == TaskDeliverAppModel.ProductionPlanID);
            if (checkExistValue != null)
            {
                for (int i = 0; i < checkExistValue.Count; i++)
                {
                    if (checkExistValue[i].MaterialType == TaskDeliverAppModel.MaterialType
                        && checkExistValue[i].Width == TaskDeliverAppModel.Width
                        && checkExistValue[i].Thickness == TaskDeliverAppModel.Thickness
                        && checkExistValue[i].StoreID == TaskDeliverAppModel.StoreID
                        && checkExistValue[i].Vendor == TaskDeliverAppModel.Vendor)
                    {
                        return new ApiResponeModel
                        {
                            Status = 500,
                            Success = false,
                            Message = "Already Exist",
                            Data = TaskDeliverAppModel,
                        };
                    }
                }
            }
            var _mapping = _mapper.Map<TaskDeliverApp>(TaskDeliverAppModel);
            try
            {
                var planSubString = TaskDeliverAppModel.ProductionPlanID!.Substring(0, 4);
                var getReceiptNo = await GetReceiptNoTaskApp(planSubString, TaskDeliverAppModel!.TaskDate!.ToString());
                _mapping.ReceiptNo = getReceiptNo.Data.ToString();
                await _taskDeliverAppRepository.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();
                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = _mapping,
                };
            }
            catch (Exception ex)
            {
                await _taskDeliverAppRepository.DeleteAsync(_mapping);
                await _unitOfWork.SaveChanges();
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = TaskDeliverAppModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, TaskDeliverAppModel TaskDeliverAppModel)
        {
            try
            {
                var map = _mapper.Map<TaskDeliverApp>(TaskDeliverAppModel);
                if (id != TaskDeliverAppModel.TaskDeliverAppID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _taskDeliverAppRepository.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = map
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = TaskDeliverAppModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _taskDeliverAppRepository.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _taskDeliverAppRepository.DeleteAsync(value);
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

        public async Task<IEnumerable<TaskDeliverAppModel>> GetListTaskDeliverAppByBranchId(string branchId, string fromDate, string toDate, string steelType)
        {
            var listPlan = await _cateProductionPlanRepository.GetAllAsync(p => p.BranchID == branchId);
            var listStringPlan = listPlan.Select(c => c.ProductionPlanID).ToList();
            var listEntity = await _taskDeliverAppRepository.GetAllAsync();
            var listTaskDeliverAppByBranchId = listEntity.Where(item => listStringPlan.Contains(item.ProductionPlanID) && item.TaskDate >= DateTime.Parse(fromDate) && item.TaskDate <= DateTime.Parse(toDate) && item.MaterialType == steelType).ToList();
            var mapList = _mapper.Map<IEnumerable<TaskDeliverAppModel>>(listTaskDeliverAppByBranchId.OrderBy(c => int.Parse(c.ReceiptNo!)));
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _taskDeliverAppRepository.GetAsync(c => c.TaskDeliverAppID == id);
            var entityMapped = _mapper.Map<TaskDeliverAppModel>(entity);
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
        public async Task<IEnumerable<TaskDeliverAppModel>> GetListByUsername(string username, string branchId, string materialType)
        {
            var listPlan = await _cateProductionPlanRepository.GetAllAsync(p => p.BranchID == branchId);
            var listStringPlan = listPlan.Select(c => c.ProductionPlanID).ToList();
            var listEntity = await _taskDeliverAppRepository.GetAllAsync(c => c.UserName == username && c.MaterialType!.Contains(materialType) && c.IsFinish == false);
            var listReturn = listEntity.Where(c => listStringPlan.Contains(c.ProductionPlanID!)).ToList();
            var mapList = _mapper.Map<IEnumerable<TaskDeliverAppModel>>(listReturn);
            return mapList;
        }
        public async Task<IEnumerable<ProductImeiModel>> GetListProductImeiByPlanId(string planId)
        {
            planId = Uri.UnescapeDataString(planId);
            List<ProductImeiModel> productList = new List<ProductImeiModel>();
            var taskApp = await _taskDeliverAppRepository.GetAllAsync(c => c.ProductionPlanID == planId);
            if (taskApp != null)
            {
                for(int j = 0; j < taskApp.Count(); j++)
                {
                    var listTaskDetail = await _taskDeliverDetailRepository.GetAllAsync(c => c.TaskDeliverAppID == taskApp[j].TaskDeliverAppID);
                    if (listTaskDetail != null)
                    {
                        for (var i = 0; i < listTaskDetail.Count; i++)
                        {
                            var beginIn = await _beginningInventoryRepository.GetAsync(c => c.Imei == listTaskDetail[i].Imei);
                            var product = await _productImeiRepository.GetAsync(c => c.Imei == listTaskDetail[i].Imei);
                            if (product != null)
                            {
                                var mapProduct = _mapper.Map<ProductImeiModel>(product);
                                productList.Add(mapProduct);
                            }
                            else if (beginIn != null)
                            {
                                var mapBegining = _mapper.Map<ProductImeiModel>(beginIn);
                                productList.Add(mapBegining);
                            }
                        }
                    }
                }
            }
            return productList.Distinct();
        }
        //public async Task<IEnumerable<TaskDeliverAppModel>> GetListTapeByUsername(string username, string branchId, string materialType)
        //{
        //    var listEntity = await _taskDeliverAppRepository.GetAllAsync(c => c.UserName == username && c.MaterialType.Contains("B") && c.IsFinish == false);
        //    var mapList = _mapper.Map<IEnumerable<TaskDeliverAppModel>>(listEntity);
        //    return mapList;
        //}
        public async Task<ApiResponeModel> GetReceiptNoTaskApp(string planType, string dateReceipt)
        {
            List<string?> listStringRecepitNo = new List<string?>();
            DateTime baseDate = DateTime.Parse(dateReceipt);
            DateTime fromDate = new DateTime(baseDate.Year, baseDate.Month, 1);
            DateTime toDate = new DateTime(baseDate.Year, baseDate.Month, DateTime.DaysInMonth(baseDate.Year, baseDate.Month));
            try
            {
                var listTask = await _taskDeliverAppRepository.GetAllAsync(c => c.ProductionPlanID!.Contains(planType) && c.TaskDate >= fromDate && c.TaskDate <= toDate);
                listStringRecepitNo = listTask.Select(x => x.ReceiptNo).ToList();

                if (listStringRecepitNo.Count == 0)
                {
                    listStringRecepitNo!.Add("0001");
                }
                else
                {
                    listStringRecepitNo.Sort();
                    string missingId = "";
                    for (int i = 0; i < listStringRecepitNo.Count - 1; i++)
                    {
                        int currentIdNumber = int.Parse(listStringRecepitNo[i]!);
                        int nextIdNumber = int.Parse(listStringRecepitNo[i + 1]!);

                        if (nextIdNumber - currentIdNumber > 1)
                        {
                            missingId = (currentIdNumber + 1).ToString("D" + listStringRecepitNo[i]!.Length);
                            listStringRecepitNo.Add(missingId);
                            break;
                        }

                    }
                    if (missingId.Length == 0)
                    {
                        int nextIdNumber = int.Parse(listStringRecepitNo!.Last()!) + 1;
                        listStringRecepitNo.Add(nextIdNumber.ToString("D" + listStringRecepitNo!.Last()!.Length));

                    }
                }
                return new ApiResponeModel
                {
                    Status = 200,
                    Success = true,
                    Message = "",
                    Data = listStringRecepitNo!.Last()!
                };
            }
            catch
            {
                return new ApiResponeModel
                {
                    Status = 0,
                    Success = false,
                    Message = "",
                    Data = ""
                };
            }
        }
    }
}


