using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IReceiptService
    {
        Task<IEnumerable<ReceiptModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(ReceiptModel receiptModel);
        Task<ApiResponeModel> Update(decimal id, ReceiptModel receiptModel);
        Task<ApiResponeModel> Delete(decimal id);
        Task<IEnumerable<ReceiptVmModel>> SearchListReceipt(ReceiptSearchModel receiptSearchModel);
        Task<ApiResponeModel> GetReceiptNoOfReceipt(ReceiptSearchModel receiptSearchModel);
        Task<ApiResponeModel> GetStatisticalMonth();
        Task<ApiResponeModel> GetStatisticalByDate(ReceiptSearchModel model);
    }
}
