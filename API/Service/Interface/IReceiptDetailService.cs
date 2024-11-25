using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IReceiptDetailService
    {
        Task<IEnumerable<ReceiptDetailModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(ReceiptDetailModel receiptDetailModel);
        Task<ApiResponeModel> Update(decimal id, ReceiptDetailModel receiptDetailModel);
        Task<ApiResponeModel> Delete(decimal id);
        Task<ApiResponeModel> GetReceiptDetailFull(decimal receiptId);
    }
}
