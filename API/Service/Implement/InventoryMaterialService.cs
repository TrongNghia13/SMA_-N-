using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using DATA;
using DATA.Infastructure;
using Helper;
using Model.Models;
using Org.BouncyCastle.Ocsp;
using Service.Interface;

namespace Service.Implement
{
    public class InventoryMaterialService : IInventoryMaterial
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateStore> _cateStoreRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<SteelDefectDetail> _steelDefectDetailRepository;

        public InventoryMaterialService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _cateStoreRepository = _unitOfWork.CateStoreRepository;
            _steelDefectDetailRepository = _unitOfWork.SteelDefectDetailRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponeModel> GetInventoryMaterial(RequestInstockModel requestInstockModel)
        {
            decimal totalQuantity = 0;
            try
            {
                var listStore = await _cateStoreRepository.GetAllAsync(c => c.StoreTypeID == requestInstockModel.StoreTypeId && c.BranchID == requestInstockModel.BranchId);
                for (var i = 0; i < listStore.Count; i++)
                {
                    var para = new DynamicParameters();
                    para.Add("@QuantityInventory", null, System.Data.DbType.Decimal, direction: System.Data.ParameterDirection.Output);
                    para.Add("@StoreID", listStore[i].StoreID);
                    para.Add("@ProductID", requestInstockModel.ProductId);
                    para.Add("@Month", requestInstockModel.MonthId);
                    var InvnetoryMaterial = await SQLHelper.ExecQueryNonDataAsync("[SP_INVENTORYMATERIAL_GET]", para, commandType: CommandType.StoredProcedure);
                    var quantityInventory = para.Get<decimal>("@QuantityInventory");
                    totalQuantity += quantityInventory;
                }
                return new ApiResponeModel()
                {
                    Data = totalQuantity,
                    Status = 200,
                    Success = true,
                    Message = "Get Success !"
                };
            }
            catch
            {
                return new ApiResponeModel()
                {
                    Data = 0,
                    Status = 200,
                    Success = true,
                    Message = "Get Success !"
                };
            }
        }


        public async Task<IEnumerable<ReceiptImeiVmModel>> GetImeiInventoryMaterial(RequestInstockModel requestInstockModel)
        {
            List<ReceiptImeiVmModel> receimeiInventory = new List<ReceiptImeiVmModel>();
            try
            {
                var listStore = await _cateStoreRepository.GetAllAsync(c => c.StoreTypeID == requestInstockModel.StoreTypeId && c.BranchID == requestInstockModel.BranchId);
                for (var i = 0; i < listStore.Count; i++)
                {
                    var para = new DynamicParameters();
                    para.Add("@MaterialType", requestInstockModel.MaterialType);
                    para.Add("@StoreID", listStore[i].StoreID);
                    para.Add("@ProductID", requestInstockModel.ProductId);
                    para.Add("@Month", requestInstockModel.MonthId);
                    var invnetoryMaterialImei = await SQLHelper.ExecProcedureDataAsync<ReceiptImeiVmModel>("[SP_INVENTORYMATERIAL_IMEI_GET]", para/*, commandType: CommandType.StoredProcedure*/);
                    List<ReceiptImeiVmModel>? invnetoryMaterialImeiList = new List<ReceiptImeiVmModel>();
                    if (invnetoryMaterialImei != null)
                    {
                        invnetoryMaterialImeiList = invnetoryMaterialImei.ToList();

                        for (var j = 0; j < invnetoryMaterialImeiList.Count; j++)
                        {
                            invnetoryMaterialImeiList[j].Key = invnetoryMaterialImeiList[j].ReceiptImeiID.ToString();
                            var defect = await _steelDefectDetailRepository.GetAllAsync(c => c.Imei == invnetoryMaterialImeiList[j].Imei);
                            if(defect != null)
                            {
                                var mappingDefect = _mapper.Map<List<SteelDefectDetailModel>>(defect);
                                invnetoryMaterialImeiList[j].listSteelDefectDetails = mappingDefect;
                            }
                            receimeiInventory.Add(invnetoryMaterialImeiList[j]);

                        }
                    }
                }
                return receimeiInventory;
            }
            catch
            {
                return receimeiInventory;
            }
        }
    }
}
