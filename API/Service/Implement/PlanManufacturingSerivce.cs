using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Model.Models.PlanManuafacturing;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Helper;
using Dapper;
using System.Net.WebSockets;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.Data;
using Microsoft.EntityFrameworkCore.Storage;
using System.Threading;
using Model.Models.PlanManuafacturing;
using static Model.Models.PlanManuafacturing.PlanManufacturingWithInputModels;
using static Dapper.SqlMapper;

namespace Service.Implement
{
    public class PlanManufacturingSerivce : IPlanManufacturingSerivce
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<PlanManufacturing> _planManufacturingService;
        private readonly ISteelDefectDetailService _steelDefectDetailService;
        private readonly IMapper _mapper;

        public PlanManufacturingSerivce(IUnitOfWork unitOfWork, IMapper mapper, ISteelDefectDetailService steelDefectDetailService)
        {
            _unitOfWork = unitOfWork;
            _planManufacturingService = _unitOfWork.PlanManufacturingRepository;
            _steelDefectDetailService = steelDefectDetailService;
            _mapper = mapper;
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _planManufacturingService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _planManufacturingService.DeleteAsync(value);
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

        public async Task<IEnumerable<PlanManufacturingModel>> GetAll()
        {
            var listEntity = await _planManufacturingService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<PlanManufacturingModel>>(listEntity);
            return mapList;
        }


        public async Task<ApiResponeModel> GetPlanNo(string branchID, string ReceiptType, string MonthId)
        {

            try
            {
                var lPlan = await _planManufacturingService.GetAllAsync(c => c.MonthID == MonthId
                                                                        && c.BranchID == branchID
                                                                        && c.MaterialType == ReceiptType);

                var listPlanRollbyBranchId = lPlan.Select(l => l.BranchID == branchID && l.MaterialType == ReceiptType);

                if (lPlan.Count() == 0)
                {
                    return new ApiResponeModel()
                    {
                        Success = true,
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
                    {
                        Success = true,
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

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _planManufacturingService.GetAsync(c => c.PlanManufacturingID == id);
            var entityMapped = _mapper.Map<PlanManufacturingModel>(entity);
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

        public async Task<ApiResponeModel> GetByProductionPlanId(string productionPlanId)
        {

            var entity = await _planManufacturingService.GetAllAsync(c => c.ProductionPlanID == productionPlanId);
            var entityMapped = _mapper.Map<IEnumerable<PlanManufacturingModel>>(entity);
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

        public async Task<ApiResponeModel> GetPlanScaleRollManuafacturing(int isFinish, string branchId)
        {

            var para = new DynamicParameters();
            para.Add("@branchID", branchId);
            para.Add("@isFinish", isFinish);
            var lsPlanRollModel = await SQLHelper.ExecProcedureDataAsync<PlanRollModel>("SP_PLANROLL_SCALE_MANUAFACTURING_GET", para);
            var entityMapped = _mapper.Map<IEnumerable<PlanRollModel>>(lsPlanRollModel);
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

        public async Task<ApiResponeModel> GetInventoryMaterialNotManuafacturing(string PlanproductionId, string branchId)
        {

            var para = new DynamicParameters();
            para.Add("@ProductionPlanID", PlanproductionId);
            var lsPlanRollModel = await SQLHelper.ExecProcedureDataAsync<InventoryMaterialNotManuafacturingModel>("[SP_INVENTORY_MATERIAL_N_MAFACTURING]", para);
            var entity = _mapper.Map<List<InventoryMaterialNotManuafacturingModel>>(lsPlanRollModel);

            for (int i = 0; i < entity.Count(); i++)
            {
                var lsdefect = await _steelDefectDetailService.GetListDefectByImei(entity[i].Imei);
                var lsdefects = _mapper.Map<List<SteelDefectDetailModel>>(lsdefect);
                if (lsdefects != null)
                {
                    entity[i].listSteelDefectDetails = new List<SteelDefectDetailModel>();
                    for (int j = 0; j < lsdefects.Count(); j++)
                    {
                        entity[i].listSteelDefectDetails.Add(lsdefects[j]);

                    }
                }
            }

            var SortOrder = 1;
            foreach (var item in entity)
            {
                item.SortOrder = SortOrder;
                SortOrder++;
            }

            if (entity == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = entity,
                Success = true,
                Message = "Get Successfully!"
            };
        }

        public async Task<ApiResponeModel> GetInventoryMaterialNotMaterialInput(string MaterialType, string ProductionPlanID)
        {

            var para = new DynamicParameters();
            para.Add("@MaterialType", MaterialType);
            para.Add("@ProductionPlanID", ProductionPlanID);
            var lsPlanRollModel = await SQLHelper.ExecProcedureDataAsync<PlanDetailOutputModel>("[SP_INVENTORY_NOT_MATERIAL_INPUT_GET]", para);           
            var entityMapped = _mapper.Map<List<PlanDetailOutputModel>>(lsPlanRollModel);
            entityMapped = entityMapped.DistinctBy(l => l.PlanDetailOutputID).ToList();
            var SortOrder = 1;
            foreach (var item in entityMapped)
            {
                item.SortOrder = SortOrder;
                SortOrder++;
            }

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


        public async Task<ApiResponeModel> GetInStockMaterial(string productionPlanId)
        {
            var para = new DynamicParameters();

            productionPlanId = Uri.UnescapeDataString(productionPlanId);
            para.Add("@ProductionPlanID", productionPlanId);
            var lsInStockMaterial = await SQLHelper.ExecProcedureDataAsync<InStockMaterialModel>("SP_INSTOCK_MATERIAL_GET", para);
            var entity = _mapper.Map<List<InStockMaterialModel>>(lsInStockMaterial);

            for (int i = 0; i < entity.Count(); i++)
            {
                var lsdefect = await _steelDefectDetailService.GetListDefectByImei(entity[i].Imei);
                var lsdefects = _mapper.Map<List<SteelDefectDetailModel>>(lsdefect);
                if (lsdefects != null)
                {
                    entity[i].listSteelDefectDetails = new List<SteelDefectDetailModel>();
                    for (int j = 0; j < lsdefects.Count(); j++)
                    {
                        entity[i].listSteelDefectDetails.Add(lsdefects[j]);

                    }
                }
            }

            var SortOder = 1;
            foreach (var item in lsInStockMaterial)
            {
                item.SortOrder = SortOder;
                SortOder++;
            }

            if (lsInStockMaterial == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = lsInStockMaterial,
                Success = true,
                Message = "Get Successfully!"
            };
        }

        public async Task<ApiResponeModel> GetPlanRoll(int isFinish, string branchId)
        {
            var para = new DynamicParameters();
            para.Add("@branchID", branchId);
            para.Add("@isFinish", isFinish);
            var lsPlanRollModel = await SQLHelper.ExecProcedureDataAsync<PlanRollModel>("SP_PLANROLL_GET", para);
            if (lsPlanRollModel == null)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "ID Not Found!"
                };
            }
            return new ApiResponeModel
            {
                Data = lsPlanRollModel,
                Success = true,
                Message = "Get Successfully!"
            };
        }

        public async Task<ApiResponeModel> INS_UPS(PlanManufacturingWithInputModel PlanManufacturingWithInputModel)
        {
            try
            {
                var MonthID = PlanManufacturingWithInputModel.planManufacturingVm.PlanDate?.ToString("yyyyMM");

                var para = new DynamicParameters();
                para.Add("@PlanManufacturingID", PlanManufacturingWithInputModel.planManufacturingVm.PlanManufacturingID);
                para.Add("@BranchID", PlanManufacturingWithInputModel.planManufacturingVm.BranchID);
                para.Add("@MonthID", MonthID);
                para.Add("@PlanDate", PlanManufacturingWithInputModel.planManufacturingVm.PlanDate);
                para.Add("@MaterialType", PlanManufacturingWithInputModel.planManufacturingVm.MaterialType);
                para.Add("@PlanNo", PlanManufacturingWithInputModel.planManufacturingVm.PlanNo);
                para.Add("@ProductionPlanID", PlanManufacturingWithInputModel.planManufacturingVm.ProductionPlanID);
                para.Add("@PlanDescription", PlanManufacturingWithInputModel.planManufacturingVm.PlanDescription);
                para.Add("@TotalSource", PlanManufacturingWithInputModel.planManufacturingVm.TotalSource);
                para.Add("@TotalTarget", PlanManufacturingWithInputModel.planManufacturingVm.TotalTarget);
                para.Add("@CreatedBy", PlanManufacturingWithInputModel.planManufacturingVm.CreatedBy);
                para.Add("@CreatedDate", DateTime.Now);
                para.Add("@OutputID", null, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                await SQLHelper.ExecQueryNonDataAsync("[SP_PLANMANUFACTORING_INS_UPS]", para, commandType: CommandType.StoredProcedure);
                var PlanManufacturingID = para.Get<decimal>("@OutputID");

                if (PlanManufacturingWithInputModel.planManufacturingVm.listPlanDetailInputs != null)
                {
                    foreach (var item in PlanManufacturingWithInputModel.planManufacturingVm.listPlanDetailInputs)
                    {
                        var inputPara = new DynamicParameters();
                        inputPara.Add("@PlanDetailInputID", item.PlanDetailInputID);
                        inputPara.Add("@PlanManufacturingID", PlanManufacturingID);
                        inputPara.Add("@ReceiptImeiID", item.ReceiptImeiID);
                        inputPara.Add("@ReceiptDate", PlanManufacturingWithInputModel.planManufacturingVm.PlanDate);
                        inputPara.Add("@ReceiptNo", item.ReceiptNo);
                        inputPara.Add("@ProductID", item.ProductID);
                        inputPara.Add("@Quantity", item.Quantity);
                        inputPara.Add("@Standard", item.Standard);
                        inputPara.Add("@ProductionBatchNo", item.ProductionBatchNo);
                        inputPara.Add("@GalvanizedOrganization", item.GalvanizedOrganization);
                        inputPara.Add("@SteelPrice", item.SteelPrice);
                        inputPara.Add("@Vendor", item.Vendor);
                        inputPara.Add("@SteelType", item.SteelType);
                        inputPara.Add("@Width", item.Width);
                        inputPara.Add("@Thickness", item.Thickness);
                        inputPara.Add("@Weight", item.Weight);
                        inputPara.Add("@WeightActual", item.WeightActual);
                        inputPara.Add("@Imei", item.Imei);
                        inputPara.Add("@Specification", item.Specification);
                        inputPara.Add("@Description", item.Description);
                        inputPara.Add("@SortOrder", item.SortOrder);
                        inputPara.Add("@OutputID", null, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                        await SQLHelper.ExecQueryNonDataAsync("[SP_PLANDETAILINPUT_INS_UPS]", inputPara, commandType: CommandType.StoredProcedure);
                        var PlanDetailInputID = inputPara.Get<decimal>("@OutputID");
                        //-----------------------------------------------------------------------------------------------------------------

                        if (item.listPlanDetailOutputs != null)
                        {
                            foreach (var itemOut in item.listPlanDetailOutputs)
                            {
                                var outPutPara = new DynamicParameters();
                                outPutPara.Add("@PlanDetailOutputID", itemOut.PlanDetailOutputID);
                                outPutPara.Add("@PlanManufacturingID", PlanManufacturingID);
                                outPutPara.Add("@PlanDetailInputID", PlanDetailInputID);
                                outPutPara.Add("@ProductID", itemOut.ProductID);
                                outPutPara.Add("@Quantity", itemOut.Quantity);
                                outPutPara.Add("@Standard", item.Standard);
                                outPutPara.Add("@ProductionBatchNo", item.ProductionBatchNo);
                                outPutPara.Add("@GalvanizedOrganization", item.GalvanizedOrganization);
                                outPutPara.Add("@SteelPrice", itemOut.SteelPrice);
                                outPutPara.Add("@Vendor", itemOut.Vendor);
                                outPutPara.Add("@SteelType", itemOut.SteelType);
                                outPutPara.Add("@Width", itemOut.Width);
                                outPutPara.Add("@Thickness", itemOut.Thickness);
                                outPutPara.Add("@Weight", itemOut.Weight);
                                outPutPara.Add("@WeightActual", itemOut.WeightActual);
                                outPutPara.Add("@Imei", itemOut.Imei);
                                outPutPara.Add("@Specification", itemOut.Specification);
                                outPutPara.Add("@Description", itemOut.Description);
                                outPutPara.Add("@SortOrder", itemOut.SortOrder);
                                outPutPara.Add("@ParenID", itemOut.ParentID);
                                outPutPara.Add("@OutputID", null, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                                await SQLHelper.ExecQueryNonDataAsync("[SP_PLANDETAILOUTPUT_INS_UPS]", outPutPara, commandType: CommandType.StoredProcedure);
                                var PlanDetailOutputID = outPutPara.Get<decimal>("@OutputID");



                            }
                        }
                    }

                }
            }
            catch (Exception e)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + e.Message,
                    Status = 405
                };
            }

            return new ApiResponeModel
            {
                Success = true,
                Message = "Create Sucess!",
                Status = 200
            };
        }

        public async Task<ApiResponeModel> Scale_Product(List<ScaleProductModel> lsScaleProductModel)
        {
            try
            {
                foreach (var item in lsScaleProductModel)
                {
                    var para = new DynamicParameters();
                    para.Add("@ReceiptImeiID", item.ReceiptImeiID);
                    para.Add("@planDetailInputID", item.planDetailInputID);
                    para.Add("@planDetailOutputID", 0);
                    para.Add("@Weight3", item.Weight3);
                    para.Add("@Weight2", item.Weight2);
                    para.Add("@Weight", 0);
                    para.Add("@WeightActual", 0);
                    await SQLHelper.ExecQueryNonDataAsync("[SP_WEIGHT3_UPD]", para, commandType: CommandType.StoredProcedure);

                    foreach (var itemOutput in item.listDetailOutputs)
                    {
                        var paraOutPut = new DynamicParameters();
                        paraOutPut.Add("@ReceiptImeiID", 0);
                        paraOutPut.Add("@planDetailInputID", 0);
                        paraOutPut.Add("@planDetailOutputID", itemOutput.PlanDetailOutputID);
                        paraOutPut.Add("@Weight3", 0);
                        paraOutPut.Add("@Weight2", 0);
                        paraOutPut.Add("@Weight", itemOutput.Weight);
                        paraOutPut.Add("@WeightActual", itemOutput.WeightActual);
                        await SQLHelper.ExecQueryNonDataAsync("[SP_WEIGHT3_UPD]", paraOutPut, commandType: CommandType.StoredProcedure);
                    }

                }
            }
            catch (Exception e)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + e.Message,
                    Status = 405
                };
            }

            return new ApiResponeModel
            {
                Success = true,
                Message = "Create Sucess!",
                Status = 200
            };
        }
    }
}

