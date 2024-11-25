using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DATA;
using Helper;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Model.Models;
using Model.Models.Inventory;
using Org.BouncyCastle.Asn1.Ocsp;
using Service.Interface;

namespace Service.Implement
{
    public class InventoryService : IInventoryService
    {
        private readonly ISteelDefectDetailService _defectDetailService;
        private readonly IReceiptService _receiptService;
        private readonly IReceiptImeiService _receiptImeiService;
        private readonly IReceiptDetailService _receiptDetailService;
        private readonly IMaterialExportService _MaterialExportService;

        public InventoryService(ISteelDefectDetailService steelDefectDetailService, IReceiptImeiService receiptImeiService,IReceiptDetailService receiptDetailService,IMaterialExportService materialExportService)
        {
            _defectDetailService = steelDefectDetailService;
            _receiptImeiService = receiptImeiService;
            _receiptDetailService = receiptDetailService;
            _MaterialExportService = materialExportService;
        }

        private string GenerateSpecification(ReceiptImeiWithDefectDetail r, string materialType)
        {


            var Imei = materialType + r.SteelType + "-" + r.Vendor + r.ProductionBatchNo + r.GalvanizedOrganization + r.SteelPrice + "-" + r.Width + "-" + r.Thickness + "-" + String.Format("{0:00000}", r.Weight1);
            return Imei;
        }
        private async Task<ApiResponeModel> InputInventory(InventoryModel inventoryModel)
        {
            decimal receiptID;

            {
                try
                {


                    var paraReceipt = new DynamicParameters();
                    paraReceipt.Add("@ReceiptID", inventoryModel.receipt.ReceiptID);
                    paraReceipt.Add("@BranchID", inventoryModel.receipt.BranchID);
                    paraReceipt.Add("@MonthlyID", inventoryModel.receipt.MonthID);
                    paraReceipt.Add("@MaterialType", inventoryModel.receipt.MaterialType);
                    paraReceipt.Add("@ReceiptDate", inventoryModel.receipt.ReceiptDate);
                    paraReceipt.Add("@ReceiptType", inventoryModel.receipt.ReceiptType);
                    paraReceipt.Add("@BusinessID", inventoryModel.receipt.BusinessID);
                    paraReceipt.Add("@ReceiptNo", inventoryModel.receipt.ReceiptNo);
                    paraReceipt.Add("@ReceiptContent", inventoryModel.receipt.ReceiptContent);
                    paraReceipt.Add("@EmployeeCode", "0");
                    paraReceipt.Add("@StoreID", inventoryModel.receipt.StoreID);
                    paraReceipt.Add("@CounterpartyID", inventoryModel.receipt.CounterpartyID);
                    paraReceipt.Add("@IsPrintBarCode", inventoryModel.receipt.IsPrintBarCode);
                    paraReceipt.Add("@CreatedBy", inventoryModel.receipt.CreatedBy);
                    paraReceipt.Add("@OutPut", inventoryModel.receipt.ReceiptID, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                    await SQLHelper.ExecQueryNonDataAsync("SP_RECEIPT_INS_UPD", paraReceipt, commandType: CommandType.StoredProcedure);
                    receiptID = paraReceipt.Get<decimal>("@OutPut");

                    if(inventoryModel.receipt.MaterialType=="B" || inventoryModel.lstReceiptDetail[0].ProductID== "PL-CUON")
                    {
                        var material = new MaterialExportModel()
                        {
                            MaterialExportID = 0,
                            ProductionPlanID = inventoryModel.receipt.productionPlanID ?? "",
                            ReceiptID = receiptID,
                        };
                        await _MaterialExportService.Create(material);
                    }

                    //--------------------------------------------------------------------------------------------------------------------------------------------------
                    //Inser list ReceitDetail
                    List<decimal> lsReceiptDetailId = new List<decimal>();
                    if (inventoryModel.lstReceiptDetail.Count != null)
                    {
                        foreach (var item in inventoryModel.lstReceiptDetail)
                        {
                            var paraDetail = new DynamicParameters();
                            paraDetail.Add("@ReceiptDetailID", item.ReceiptDetailID);
                            paraDetail.Add("@ReceiptID", receiptID);
                            paraDetail.Add("@ProductID", item.ProductID);
                            paraDetail.Add("@CalculationUnit", item.CalculationUnit);
                            paraDetail.Add("@Quantity", item.Quantity);
                            paraDetail.Add("@UnitPrice", item.UnitPrice);
                            paraDetail.Add("@TotalAmount", item.TotalAmount);
                            paraDetail.Add("@TotalWeight1", item.TotalWeight1);
                            paraDetail.Add("@TotalWeight2", item.TotalWeight2);
                            paraDetail.Add("@TotalWeight3", item.TotalWeight3);
                            paraDetail.Add("@IsImei", item.IsImei);
                            paraDetail.Add("@Description", item.Description);
                            paraDetail.Add("@OutPut", item.ReceiptDetailID, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                            await SQLHelper.ExecQueryNonDataAsync("SP_RECEIPTDETAIL_INS_UPD", paraDetail, commandType: CommandType.StoredProcedure);
                            var receiptDetailId = paraDetail.Get<decimal>("@OutPut");
                            lsReceiptDetailId.Add(receiptDetailId);
                            //--------------------------------------------------------------------------------------------------------------------------------------------------
                            //Inser TruckScale
                            if (inventoryModel.receipt.LicensePlate.Trim() != "")
                            {
                                var truckPara = new DynamicParameters();
                                truckPara.Add("@TruckScaleID", 0);
                                truckPara.Add("@ReceiptID", receiptID);
                                truckPara.Add("@ScaleDate", DateTime.UtcNow);
                                truckPara.Add("@ScaleNo", item.ScaleNo);
                                truckPara.Add("@LicensePlate", inventoryModel.receipt.LicensePlate);
                                truckPara.Add("@ScaleEmployee", item.ScaleEmployee);
                                truckPara.Add("@FirstWeight", 0);
                                truckPara.Add("@SecondWeight", 0);
                                truckPara.Add("@VolumeGoods", 0);
                                await SQLHelper.ExecQueryNonDataAsync("SP_TRUCKSCALE_INS_UPD", truckPara, commandType: CommandType.StoredProcedure);
                            }
                        }
                    }

                    //--------------------------------------------------------------------------------------------------------------------------------------------------
                    //Inser ReceiptImei
                    List<decimal> lsReciptImeiId = new List<decimal>();
                    if (inventoryModel.lstReceiptImei.Count != null)
                    {
                        var couter = 0;
                        foreach (var item in inventoryModel.lstReceiptImei)
                        {

                            var paraImei = new DynamicParameters();
                            paraImei.Add("@ReceiptImeiID", item.ReceiptImeiID);
                            paraImei.Add("@ReceiptID", receiptID);
                            paraImei.Add("@ReceiptDetailID", lsReceiptDetailId[0]);
                            paraImei.Add("@SteelType", item.SteelType);
                            paraImei.Add("@ProductID", item.ProductID);
                            paraImei.Add("@Quantity", 1);
                            paraImei.Add("@Standard", item.Standard);
                            paraImei.Add("@Vendor", item.Vendor);
                            paraImei.Add("@ProductionBatchNo", item.ProductionBatchNo);
                            paraImei.Add("@GalvanizedOrganization", item.GalvanizedOrganization);
                            paraImei.Add("@SteelPrice", item.SteelPrice);
                            paraImei.Add("@Width", item.Width);
                            paraImei.Add("@Thickness", item.Thickness);
                            paraImei.Add("@Weight1", item.Weight1);
                            paraImei.Add("@Weight2", item.Weight2);
                            paraImei.Add("@Weight3", item.Weight3);
                            paraImei.Add("@Imei", GenerateSpecification(item, inventoryModel.receipt.MaterialType));
                            paraImei.Add("@Specification", GenerateSpecification(item, inventoryModel.receipt.MaterialType));
                            paraImei.Add("@Description", item.Description);
                            paraImei.Add("@SortOrder", item.SortOrder);
                            paraImei.Add("@ParentID", item.ParentID);
                            paraImei.Add("@OutPut", item.ReceiptDetailID, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                            await SQLHelper.ExecQueryNonDataAsync("SP_RECEIPTIMEI_INS_UPD", paraImei, commandType: CommandType.StoredProcedure);
                            var ReceiptImeiID = paraImei.Get<decimal>("@OutPut");
                            //--------------------------------------------------------------------------------------------------------------------------------------------------
                            //Update ImeiID
                            var ImeiPara = new DynamicParameters();
                            ImeiPara.Add("@ReceiptImeiID", ReceiptImeiID);
                            ImeiPara.Add("@Imei", GenerateSpecification(item, inventoryModel.receipt.MaterialType) + "|" + ReceiptImeiID);
                            ImeiPara.Add("@FullImei", GenerateSpecification(item, inventoryModel.receipt.MaterialType) + receiptID, System.Data.DbType.String, direction: System.Data.ParameterDirection.Output);
                            await SQLHelper.ExecQueryNonDataAsync("SP_RECEIPTIMEI_UPD_IMEI", ImeiPara, commandType: CommandType.StoredProcedure);
                            var imei = ImeiPara.Get<string>("@FullImei");

                            //--------------------------------------------------------------------------------------------------------------------------------------------------
                            //InsertUpdate Product
                            var productPara = new DynamicParameters();
                            productPara.Add("@ProductImeiID", 0, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                            productPara.Add("@ReceiptImeiID", ReceiptImeiID);
                            productPara.Add("@WorkProcessID", item.WorkProcessID);
                            productPara.Add("@Imei", imei);
                            productPara.Add("@SteelType", item.SteelType);
                            productPara.Add("@ProductID", item.ProductID);
                            productPara.Add("@Quantity", 1);
                            productPara.Add("@Standard", item.Standard);
                            productPara.Add("@Vendor", item.Vendor);
                            productPara.Add("@ProductionBatchNo", item.ProductionBatchNo);
                            productPara.Add("@GalvanizedOrganization", item.GalvanizedOrganization);
                            productPara.Add("@SteelPrice", item.SteelPrice);
                            productPara.Add("@Width", item.Width);
                            productPara.Add("@Thickness", item.Thickness);
                            productPara.Add("@Weight1", item.Weight1);
                            productPara.Add("@Weight2", item.Weight2);
                            productPara.Add("@Weight3", item.Weight3);
                            productPara.Add("@Note", "");
                            productPara.Add("@Image1", item.Image);
                            productPara.Add("@Image2", item.Image2);
                            productPara.Add("@Image3", item.Image3);
                            productPara.Add("@Image4", "");
                            productPara.Add("@Specification", GenerateSpecification(item, inventoryModel.receipt.MaterialType));
                            productPara.Add("@ParentID", 0);
                            productPara.Add("@CreatedBy", "");
                            productPara.Add("@CreatedDate", DateTime.UtcNow);
                            await SQLHelper.ExecQueryNonDataAsync("SP_PRODUCTIMEI_INS", productPara, commandType: CommandType.StoredProcedure);

                            //--------------------------------------------------------------------------------------------------------------------------------------------------
                            //Inser ListDefectDetails
                            if (item.listSteelDefectDetails != null)
                            {
                                try
                                {
                                    await _defectDetailService.DeleteRangeAsyncDefect(imei);
                                    foreach (var d in item.listSteelDefectDetails)
                                    {
                                        var steelDefectDetailModel = new SteelDefectDetailModel()
                                        {

                                            CreatedBy = d.CreatedBy,
                                            Imei = imei,
                                            Main = d.Main,
                                            CreatedDate = DateTime.UtcNow,
                                            Option1 = d.Option1,
                                            Option2 = d.Option2,
                                            Option3 = d.Option3,
                                            Option4 = d.Option4,
                                            SteelDefectName = d.SteelDefectName
                                        };
                                        await _defectDetailService.Create(steelDefectDetailModel);
                                    }
                                }
                                catch (Exception e)
                                {
                                    return new ApiResponeModel()
                                    {
                                        Status = 405,
                                        Message = e.Message,
                                        Success = false,
                                    };
                                }

                            }
                        }
                    }
                }

                catch (Exception e)
                {


                    return new ApiResponeModel()
                    {

                        Status = 405,
                        Message = e.Message,
                        Success = false,
                    };
                }
            }



            return new ApiResponeModel()
            {
                Status = 200,
                Success = true,
                Message = "OK",

            };
        }
        private async Task<ApiResponeModel> OutPutInventory(InventoryModel inventoryModel)
        {
            decimal receiptID;

            try
            {
                

                //Inser Receipt
                var paraReceipt = new DynamicParameters();
                paraReceipt.Add("@ReceiptID", inventoryModel.receipt.ReceiptID);
                paraReceipt.Add("@BranchID", inventoryModel.receipt.BranchID);
                paraReceipt.Add("@MonthlyID", inventoryModel.receipt.MonthID);
                paraReceipt.Add("@MaterialType", inventoryModel.receipt.MaterialType);
                paraReceipt.Add("@ReceiptDate", inventoryModel.receipt.ReceiptDate);
                paraReceipt.Add("@ReceiptType", inventoryModel.receipt.ReceiptType);
                paraReceipt.Add("@BusinessID", inventoryModel.receipt.BusinessID);
                paraReceipt.Add("@ReceiptNo", inventoryModel.receipt.ReceiptNo);
                paraReceipt.Add("@ReceiptContent", inventoryModel.receipt.ReceiptContent);
                paraReceipt.Add("@EmployeeCode", inventoryModel.receipt.EmployeeCode);
                paraReceipt.Add("@StoreID", inventoryModel.receipt.StoreID);
                paraReceipt.Add("@CounterpartyID", inventoryModel.receipt.CounterpartyID);
                paraReceipt.Add("@IsPrintBarCode", inventoryModel.receipt.IsPrintBarCode);
                paraReceipt.Add("@CreatedBy", inventoryModel.receipt.CreatedBy);
                paraReceipt.Add("@OutPut", inventoryModel.receipt.ReceiptID, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                await SQLHelper.ExecQueryNonDataAsync("SP_RECEIPT_INS_UPD", paraReceipt, commandType: CommandType.StoredProcedure);
                receiptID = paraReceipt.Get<decimal>("@OutPut");


                //--------------------------------------------------------------------------------------------------------------------------------------------------
                //Inser Material Export
                var material = new MaterialExportModel()
                {
                    MaterialExportID = 0,
                    ProductionPlanID = inventoryModel.receipt.productionPlanID ?? "",
                    ReceiptID=receiptID,
                };
                await  _MaterialExportService.Create(material);

                //--------------------------------------------------------------------------------------------------------------------------------------------------
                //Inser list ReceitDetail
                List<decimal> lsReceiptDetailId = new List<decimal>();
                if (inventoryModel.lstReceiptDetail.Count != null)
                {

                    foreach (var item in inventoryModel.lstReceiptDetail)
                    {

                        var paraDetail = new DynamicParameters();
                        paraDetail.Add("@ReceiptDetailID", item.ReceiptDetailID);
                        paraDetail.Add("@ReceiptID", receiptID);
                        paraDetail.Add("@ProductID", item.ProductID);
                        paraDetail.Add("@CalculationUnit", item.CalculationUnit);
                        paraDetail.Add("@Quantity", item.Quantity);
                        paraDetail.Add("@UnitPrice", item.UnitPrice);
                        paraDetail.Add("@TotalAmount", item.TotalAmount);
                        paraDetail.Add("@TotalWeight1", item.TotalWeight1);
                        paraDetail.Add("@TotalWeight2", item.TotalWeight2);
                        paraDetail.Add("@TotalWeight3", item.TotalWeight3);
                        paraDetail.Add("@IsImei", item.IsImei);
                        paraDetail.Add("@Description", item.Description);
                        paraDetail.Add("@OutPut", 0, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                        await SQLHelper.ExecQueryNonDataAsync("SP_RECEIPTDETAIL_INS_UPD", paraDetail, commandType: CommandType.StoredProcedure);
                        var receiptDetailId = paraDetail.Get<decimal>("@OutPut");
                        lsReceiptDetailId.Add(receiptDetailId);
                    }
                }


                if (inventoryModel.receipt.ReceiptID == 0)
                {
                    foreach (var item in inventoryModel.lstReceiptImei)
                    {
                        item.ReceiptDetailID = 0;
                        item.ReceiptImeiID = 0;
                    }
                }
                //else
                //{
                //  var lsReceiptImei=  await _receiptImeiService.DeleteReceiptImeiByReceiptDetailId(lsReceiptDetailId[0]);
                    
                //    foreach(var item in lsReceiptImei)
                //    {
                //        var ProductPara = new DynamicParameters();
                //        ProductPara.Add("@Imei", item.Imei);
                //        ProductPara.Add("@WorkProcessID", "XB.04");
                //        await SQLHelper.ExecQueryNonDataAsync("SP_PRODUCTIMEI_PWID_UPD", ProductPara, commandType: CommandType.StoredProcedure);
                //        await _defectDetailService.DeleteRangeAsyncDefect(item.Imei);
                //    }

                //}        
                //--------------------------------------------------------------------------------------------------------------------------------------------------
                //Inser ReceiptImei

                List<decimal> lsReciptImeiId = new List<decimal>();
                if (inventoryModel.lstReceiptImei.Count != null)
                {

                    foreach (var item in inventoryModel.lstReceiptImei)
                    {
                        item.ProductID = inventoryModel.lstReceiptDetail[0].ProductID;

                        var paraImei = new DynamicParameters();
                        paraImei.Add("@ReceiptImeiID", item.ReceiptImeiID);
                        paraImei.Add("@ReceiptID", receiptID);
                        paraImei.Add("@ReceiptDetailID", lsReceiptDetailId[0]);
                        paraImei.Add("@SteelType", item.SteelType);
                        paraImei.Add("@ProductID", item.ProductID);
                        paraImei.Add("@Quantity", 1);
                        paraImei.Add("@Standard", item.Standard);
                        paraImei.Add("@Vendor", item.Vendor);
                        paraImei.Add("@ProductionBatchNo", item.ProductionBatchNo);
                        paraImei.Add("@GalvanizedOrganization", item.GalvanizedOrganization);
                        paraImei.Add("@SteelPrice", item.SteelPrice);
                        paraImei.Add("@Width", item.Width);
                        paraImei.Add("@Thickness", item.Thickness);
                        paraImei.Add("@Weight1", item.Weight1);
                        paraImei.Add("@Weight2", item.Weight2);
                        paraImei.Add("@Weight3", item.Weight3);
                        paraImei.Add("@Imei", item.Imei);
                        paraImei.Add("@Specification", item.Specification);
                        paraImei.Add("@Description", item.Description);
                        paraImei.Add("@SortOrder", item.SortOrder);
                        paraImei.Add("@OutPut", item.ReceiptDetailID, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                        await SQLHelper.ExecQueryNonDataAsync("SP_RECEIPTIMEI_INS_UPD", paraImei, commandType: CommandType.StoredProcedure);
                      

                        //--------------------------------------------------------------------------------------------------------------------------------------------------
                        //Update Product WorkProcessID   
                        var ProductPara = new DynamicParameters();
                        ProductPara.Add("@Imei", item.Imei);
                        ProductPara.Add("@WorkProcessID", item.WorkProcessID);
                        await SQLHelper.ExecQueryNonDataAsync("SP_PRODUCTIMEI_PWID_UPD", ProductPara, commandType: CommandType.StoredProcedure);

                        //--------------------------------------------------------------------------------------------------------------------------------------------------
                        var DeliverDetailPara = new DynamicParameters();
                        DeliverDetailPara.Add("@storeID", inventoryModel.receipt.StoreID);
                        DeliverDetailPara.Add("@productId", item.ProductID);
                        DeliverDetailPara.Add("@imei", inventoryModel.lstReceiptDetail[0].IsImei);
                        DeliverDetailPara.Add("@Month",inventoryModel.receipt.MonthID);
                        await SQLHelper.ExecQueryNonDataAsync("SP_DELIVERDETAIL_CT", DeliverDetailPara, commandType: CommandType.StoredProcedure);



                        //--------------------------------------------------------------------------------------------------------------------------------------------------
                        //Inser ListDefectDetails
                        if (item.listSteelDefectDetails != null)
                        {
                            try
                            {
                                foreach (var d in item.listSteelDefectDetails)
                                {
                                    var steelDefectDetailModel = new SteelDefectDetailModel()
                                    {

                                        CreatedBy = d.CreatedBy,
                                        Imei = item.Imei,
                                        Main = d.Main,
                                        CreatedDate = DateTime.UtcNow,
                                        Option1 = d.Option1,
                                        Option2 = d.Option2,
                                        Option3 = d.Option3,
                                        Option4 = d.Option4,
                                        SteelDefectName = d.SteelDefectName
                                    };
                                    await _defectDetailService.Create(steelDefectDetailModel);
                                }
                            }
                            catch (Exception e)
                            {
                                return new ApiResponeModel()
                                {
                                    Status = 405,
                                    Message = e.Message,
                                    Success = false,
                                };
                            }

                        }
                    }
                }
            }

            catch (Exception e)
            {


                return new ApiResponeModel()
                {

                    Status = 405,
                    Message = e.Message,
                    Success = false,
                };
            }


            return new ApiResponeModel()
            {
                Status = 200,
                Success = true,

            };


        }
        public async Task<ApiResponeModel> Inventory(InventoryModel inventoryModel)
        {
            if (inventoryModel.receipt.ReceiptType == "N")
            {
                return await InputInventory(inventoryModel);
            }
            else if (inventoryModel.receipt.ReceiptType == "X")
            {
                return await OutPutInventory(inventoryModel);

            }
            return new ApiResponeModel()
            {
                Status = 200,
                Success = true,
                Message = "OK",

            };
        }
        private decimal AvarageOfRollSteel(decimal TotalWeight2, List<ReceiptImeiWithDefectDetail> ls, string Width, string Thinkess)
        {
            decimal SumV = 0;
            for (int i = 0; i < ls.Count(); i++)
            {
                SumV = (decimal.Parse(ls[i].Thickness) * decimal.Parse(ls[i].Width)) + SumV;
            }
            var AvenrageWeight = TotalWeight2 / ls.Count() / SumV;
            var V = (decimal.Parse(Width) * decimal.Parse(Thinkess));
            var PercenV = V / SumV;
            return Math.Round(TotalWeight2 * PercenV);
        }
        public async Task<ApiResponeModel> RollTruckScale(InventoryModel inventoryModel)
        {
            try
            {
                var TruckScalePara = new DynamicParameters();
                TruckScalePara.Add("@TruckScaleID", 0);
                TruckScalePara.Add("@ReceiptID", inventoryModel.receipt.ReceiptID);
                TruckScalePara.Add("@LicensePlate", inventoryModel.receipt.LicensePlate);
                TruckScalePara.Add("@ScaleDate", DateTime.Now);
                TruckScalePara.Add("@ScaleNo", inventoryModel.lstReceiptDetail[0].ScaleNo);
                TruckScalePara.Add("@ScaleEmployee", inventoryModel.lstReceiptDetail[0].ScaleEmployee);
                TruckScalePara.Add("@FirstWeight", inventoryModel.lstReceiptDetail[0].FirstWeight);
                TruckScalePara.Add("@SecondWeight", inventoryModel.lstReceiptDetail[0].SecondWeight);
                TruckScalePara.Add("@VolumeGoods", inventoryModel.lstReceiptDetail[0].TotalWeight2);
                await SQLHelper.ExecQueryNonDataAsync("SP_ROLETRUCKSCALE_INS_UPD", TruckScalePara, commandType: CommandType.StoredProcedure);

                foreach (var item in inventoryModel.lstReceiptImei)
                {
                    var WeightPara = new DynamicParameters();
                    WeightPara.Add("@ReceiptImeiID", item.ReceiptImeiID);
                    WeightPara.Add("@ReceiptDetailId", inventoryModel.lstReceiptDetail[0].ReceiptDetailID);
                    WeightPara.Add("@TotalWeight2", inventoryModel.lstReceiptDetail[0].TotalWeight2);
                    WeightPara.Add("@Weight2", AvarageOfRollSteel((decimal)inventoryModel.lstReceiptDetail[0].TotalWeight2, inventoryModel.lstReceiptImei, item.Width, item.Thickness));
                    WeightPara.Add("@Weight3", 0);
                    WeightPara.Add("@WorkProcessID", "XB.04");
                    await SQLHelper.ExecQueryNonDataAsync("SP_WEIGHT_UPD", WeightPara, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception e)
            {
                return new ApiResponeModel()
                {
                    Status = 405,
                    Success = false,
                    Message = e.Message

                };

            }
            return new ApiResponeModel()
            {
                Status = 200,
                Success = true,

            };


        }
        public async Task<ApiResponeModel> UpdateSteelDefect(InventoryModel inventoryModel)
        {
            foreach (var item in inventoryModel.lstReceiptImei)
            {

                if (item.listSteelDefectDetails != null)
                {
                    try
                    {    //--------------------------------------------------------------------------------------------------------------------------------------------------
                        //Update Product WorkProcessID

                        var WeightPara = new DynamicParameters();
                        WeightPara.Add("@ReceiptImeiID", item.ReceiptImeiID);
                        WeightPara.Add("@ReceiptDetailId", 0);
                        WeightPara.Add("@TotalWeight2", 0);
                        WeightPara.Add("@Weight2", item.Weight2);
                        WeightPara.Add("@Weight3", item.Weight3);
                        WeightPara.Add("@WorkProcessID", "XB.02");
                        await SQLHelper.ExecQueryNonDataAsync("SP_WEIGHT_UPD", WeightPara, commandType: CommandType.StoredProcedure);
                        await _defectDetailService.DeleteRangeAsyncDefect(item.Imei);
                        //--------------------------------------------------------------------------------------------------------------------------------------------------
                        //Inser ListDefectDetails

                        foreach (var d in item.listSteelDefectDetails)
                        {
                            var steelDefectDetailModel = new SteelDefectDetailModel()
                            {

                                CreatedBy = d.CreatedBy,
                                Imei = item.Imei,
                                Main = d.Main,
                                CreatedDate = DateTime.UtcNow,
                                Option1 = d.Option1,
                                Option2 = d.Option2,
                                Option3 = d.Option3,
                                Option4 = d.Option4,
                                SteelDefectName = d.SteelDefectName
                            };

                            await _defectDetailService.Create(steelDefectDetailModel);
                        }
                    }
                    catch (Exception e)
                    {
                        return new ApiResponeModel()
                        {
                            Status = 405,
                            Message = e.Message,
                            Success = false,
                        };
                    }



                }
            }

            return new ApiResponeModel()
            {
                Status = 200,
                Success = true,

            };
        }




    }

}
