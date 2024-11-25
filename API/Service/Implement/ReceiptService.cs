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
    public class ReceiptService : IReceiptService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Receipt> _receiptService;
        private readonly IMapper _mapper;
        private readonly IRepository<ReceiptDetail> _receiptDetailService;
        private readonly IRepository<CateCounterparty> _cateCounterpartyService;
        private readonly IRepository<TruckScale> _truckScaleService;
        private readonly IDeliveryDetailService _DeliveryDetailService;
        private readonly IRepository<MaterialExport> _materialExportService;



        public ReceiptService(IUnitOfWork unitOfWork, IMapper mapper, IDeliveryDetailService deliveryDetailService, IMaterialExportService materialExportService)
        {
            _unitOfWork = unitOfWork;
            _receiptService = _unitOfWork.ReceiptRepository;
            _mapper = mapper;
            _receiptDetailService = _unitOfWork.ReceiptDetailRepository;
            _cateCounterpartyService = _unitOfWork.CateCounterpartyRepository;
            _truckScaleService = _unitOfWork.TruckScaleRepository;
            _DeliveryDetailService = deliveryDetailService;
            _materialExportService = unitOfWork.MaterialExportRepository;
        }

        public async Task<ApiResponeModel> Create(ReceiptModel receiptModel)
        {
            var _mapping = _mapper.Map<Receipt>(receiptModel);
            try
            {
                await _receiptService.CreateAsync(_mapping);
                await _unitOfWork.SaveChanges();

                return new ApiResponeModel
                {
                    Success = true,
                    Message = "Create Successfully!",
                    Data = receiptModel,
                };
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Create Failed!" + ex.Message,
                    Data = receiptModel,
                };
            }
        }

        public async Task<ApiResponeModel> Update(decimal id, ReceiptModel receiptModel)
        {
            try
            {
                var map = _mapper.Map<Receipt>(receiptModel);
                if (id != receiptModel.ReceiptID)
                {
                    return new ApiResponeModel
                    {
                        Success = false,
                        Message = "Update Failed! ID Diffirent",

                    };
                }
                else
                {
                    await _receiptService.UpdateAsync(map);
                    await _unitOfWork.SaveChanges();
                    return new ApiResponeModel
                    {
                        Success = true,
                        Message = "Update Successfully!",
                        Data = receiptModel
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponeModel
                {
                    Success = false,
                    Message = "Update Failed!" + ex.Message,
                    Data = receiptModel,
                };
            }
        }

        public async Task<ApiResponeModel> Delete(decimal id)
        {
            var value = await _receiptService.GetAsync(id);
            if (value != null)
            {
                try
                {
                    await _receiptService.DeleteAsync(value);
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

        public async Task<IEnumerable<ReceiptModel>> GetAll()
        {
            var listEntity = await _receiptService.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<ReceiptModel>>(listEntity);
            return mapList;
        }

        public async Task<ApiResponeModel> GetById(decimal id)
        {
            var entity = await _receiptService.GetAsync(c => c.ReceiptID == id);
            var entityMapped = _mapper.Map<ReceiptModel>(entity);
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

        public async Task<IEnumerable<ReceiptVmModel>> SearchListReceipt(ReceiptSearchModel receiptSearchModel)
        {
            var fromDate = DateTime.Parse(receiptSearchModel.Frdate!);
            var toDate = DateTime.Parse(receiptSearchModel.Todate!);
            var listEntity = await _receiptService.GetAllAsync(
                c => c.ReceiptDate >= new DateTime(fromDate.Year, fromDate.Month, fromDate.Day)
             && c.ReceiptDate <= new DateTime(toDate.Year, toDate.Month, toDate.Day + 1)
             && c.MaterialType == receiptSearchModel.MaterialType
             && c.BusinessID == receiptSearchModel.BusinessID);
            if (receiptSearchModel.BranchID != null && receiptSearchModel.BranchID.Length > 0)
            {
                listEntity = listEntity.Where(c => c.BranchID == receiptSearchModel.BranchID).ToList();
            }
            if (receiptSearchModel.CounterpartyID != null && receiptSearchModel.CounterpartyID.Length > 0)
            {
                listEntity = listEntity.Where(c => c.CounterpartyID == receiptSearchModel.CounterpartyID).ToList();
            }
            if (receiptSearchModel.ReceiptNo != null && receiptSearchModel.ReceiptNo.Length > 0)
            {
                listEntity = listEntity.Where(c => c.ReceiptNo.Contains(receiptSearchModel.ReceiptNo)).ToList();
            }


            List<ReceiptVmModel> listReceiptVM = new List<ReceiptVmModel>();
            for (int i = 0; i < listEntity.Count; i++)
            {
                var ProductionPlanId = "";
                var Material = await _materialExportService.GetAsync(m => m.ReceiptID == listEntity[i].ReceiptID);
                if (Material != null)
                {
                    ProductionPlanId = Material.ProductionPlanID;
                }

                var counterpartyInfo = await _cateCounterpartyService.GetAsync(c => c.CounterpartyID == listEntity[i].CounterpartyID);
                var receiptVm = new ReceiptVmModel();
                var receiptDetail = await _receiptDetailService.GetAsync(c => c.ReceiptID == listEntity[i].ReceiptID);
                var truckScaleInfo = await _truckScaleService.GetAsync(c => c.ReceiptID == listEntity[i].ReceiptID);
                receiptVm.Quantity = receiptDetail != null && receiptDetail.Quantity != null ? receiptDetail.Quantity : 0;
                receiptVm.LicensePlate = truckScaleInfo != null ? truckScaleInfo.LicensePlate ?? "" : "";
                receiptVm.ReceiptID = listEntity[i].ReceiptID;
                receiptVm.ReceiptNo = listEntity[i].ReceiptNo;
                receiptVm.CounterpartyID = counterpartyInfo.CounterpartyID;
                receiptVm.CounterpartyName = counterpartyInfo.CounterpartyName;
                receiptVm.CounterpartyGroup = counterpartyInfo.CounterpartyGroup;
                receiptVm.ReceiptContent = listEntity[i].ReceiptContent;
                receiptVm.CreatedDate = listEntity[i].CreatedDate;
                receiptVm.CreatedBy = listEntity[i].CreatedBy;
                receiptVm.MaterialType = listEntity[i].MaterialType;
                receiptVm.MonthID = listEntity[i].MonthID;
                receiptVm.StoreID = listEntity[i].StoreID;
                receiptVm.ReceiptType = listEntity[i].ReceiptType;
                receiptVm.BranchID = listEntity[i].BranchID;
                receiptVm.BusinessID = listEntity[i].BusinessID;
                receiptVm.IsPrintBarCode = listEntity[i].IsPrintBarCode;
                receiptVm.ReceiptDate = listEntity[i].ReceiptDate;
                receiptVm.productionPlanID = ProductionPlanId;
                listReceiptVM.Add(receiptVm);
            }
            return listReceiptVM.Where(c => c.Quantity != 0);
        }
        public async Task<ApiResponeModel> GetReceiptNoOfReceipt(ReceiptSearchModel receiptSearchModel)
        {
            List<string?> listStringRecepitNo = new List<string?>();
            try
            {
                DateTime date = DateTime.Parse(receiptSearchModel.Frdate);
                string formattedDate = date.ToString("yyyyMM");
                var listReceipt = await _receiptService.GetAllAsync(c =>
                    c.BranchID == receiptSearchModel.BranchID &&
                    c.MaterialType == receiptSearchModel.MaterialType &&
                    c.BusinessID == receiptSearchModel.BusinessID &&
                    c.MonthID == formattedDate);
                listStringRecepitNo = listReceipt.Select(x => x.ReceiptNo).ToList();

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
        public async Task<ApiResponeModel> GetStatisticalMonth()
        {
            try
            {
                DateTime baseDate = DateTime.Now;
                DateTime fromDate = new DateTime(baseDate.Year, baseDate.Month, 1);
                DateTime toDate = new DateTime(baseDate.Year, baseDate.Month, DateTime.DaysInMonth(baseDate.Year, baseDate.Month));
                var listReceipt = await _receiptService.GetAllAsync(
                    c => c.CreatedDate >= fromDate &&
                    c.CreatedDate <= toDate);
                List<HistoryReceiptStatisticalModel> listHistory = new List<HistoryReceiptStatisticalModel>();
                for (int i = 0; i < listReceipt.Count(); i++)
                {
                    var entityDetail = await _receiptDetailService.GetAsync(c => c.ReceiptID == listReceipt[i].ReceiptID);
                    string color = "blue";
                    if (listReceipt[i].ReceiptType.Equals("N"))
                    {
                        color = "green";
                    }
                    else if (listReceipt[i].ReceiptType.Equals("X"))
                    {
                        color = "red";

                    }
                    listHistory.Add(new HistoryReceiptStatisticalModel
                    {
                        Title = (" Nhân viên ") + listReceipt[i].CreatedBy + (" - ") +
                        (" chi nhánh số ") + listReceipt[i].BranchID + (" - ") +
                        listReceipt[i].BusinessID + (" ") +
                        entityDetail.Quantity + (" ") +
                        entityDetail.CalculationUnit + (" ") +
                        listReceipt[i].CounterpartyID + (" - ") +
                        (" tại kho ") + listReceipt[i].StoreID + (" - ") +
                        (" số chứng từ ") + listReceipt[i].ReceiptNo + (" - \n") +
                        (" Nội dung: ") + listReceipt[i].ReceiptContent,
                        Color = color,
                        Time = DateTime.Parse(listReceipt[i].CreatedDate.ToString() ?? baseDate.ToString()).ToString("dd-MM-yyyy HH:mm:ss")
                    });
                }
                return new ApiResponeModel
                {
                    Status = 200,
                    Success = true,
                    Message = "",
                    Data = listHistory
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
        public async Task<ApiResponeModel> GetStatisticalByDate(ReceiptSearchModel model)
        {
            DateTime fromDate = new DateTime(DateTime.Parse(model.Frdate).Year, DateTime.Parse(model.Frdate).Month, 1);
            DateTime toDate = new DateTime(DateTime.Parse(model.Todate).Year, DateTime.Parse(model.Todate).Month, DateTime.DaysInMonth(DateTime.Parse(model.Todate).Year, DateTime.Parse(model.Todate).Month));
            var listEntity = await _receiptService.GetAllAsync(c => c.ReceiptDate >= fromDate && c.ReceiptDate <= toDate);
            List<HistoryReceiptStatisticalModel> list = new List<HistoryReceiptStatisticalModel>();
            var entityMapped = _mapper.Map<List<ReceiptModel>>(listEntity);
            decimal quantityNhapCuon = 0;
            decimal quantityNhapBang = 0;
            decimal quantityXuatCuon = 0;
            for (int i = 0; i < entityMapped.Count; i++)
            {
                var entityDetail = await _receiptDetailService.GetAsync(c => c.ReceiptID == entityMapped[i].ReceiptID);
                string name = "";
                if (entityMapped[i].BusinessID == "N11")
                {
                    quantityNhapCuon += entityDetail.Quantity;
                }
                else if (entityMapped[i].BusinessID == "N22")
                {
                    quantityNhapBang += entityDetail.Quantity;
                }
                else if (entityMapped[i].BusinessID == "X12")
                {
                    quantityXuatCuon += entityDetail.Quantity;

                }

            }
            HistoryReceiptStatisticalModel modelNhapCuon = new HistoryReceiptStatisticalModel();
            modelNhapCuon.Name = "Nhập kho cuộn";
            modelNhapCuon.Color = "#99FF99";
            modelNhapCuon.Data = new List<int> { (int)quantityNhapCuon };
            HistoryReceiptStatisticalModel modelNhapBang = new HistoryReceiptStatisticalModel();
            modelNhapBang.Name = "Nhập kho Băng";
            modelNhapBang.Color = "#FFFFE0";
            modelNhapBang.Data = new List<int> { (int)quantityNhapBang };

            HistoryReceiptStatisticalModel modelXuatCuon = new HistoryReceiptStatisticalModel();
            modelXuatCuon.Name = "Xuất kho Cuộn";
            modelXuatCuon.Color = "#FF9999";
            modelXuatCuon.Data = new List<int> { (int)quantityXuatCuon };
            list.Add(modelNhapCuon);
            list.Add(modelXuatCuon);
            list.Add(modelNhapBang);
            if (entityMapped == null)
            {
                return new ApiResponeModel
                {
                    Status = 0,
                    Success = false,
                    Message = "Get Failed!"
                };
            }
            return new ApiResponeModel
            {
                Status = 200,
                Data = list,
                Success = true,
                Message = "Get Successfully!"
            };
        }
    }
}


