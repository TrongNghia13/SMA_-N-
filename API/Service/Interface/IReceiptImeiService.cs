using DATA;
using Model.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IReceiptImeiService
    {
        Task<IEnumerable<ReceiptImeiModel>> GetAll();
        Task<IEnumerable<ReceiptImei>> DeleteReceiptImeiByReceiptDetailId(decimal ReceiptDetailId);
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(ReceiptImeiModel receiptImeiModel);
        Task<ApiResponeModel> Update(decimal id, ReceiptImeiModel receiptImeiModel);
        Task<ApiResponeModel> Delete(decimal id);
        Task<ApiResponeModel> GetRollByImei(string imei);
        Task<ApiResponeModel> GetTapeByImei(string imei);


    }
}
