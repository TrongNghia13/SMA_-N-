using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ISteelDefectDetailService
    {
        Task<IEnumerable<SteelDefectDetailModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(SteelDefectDetailModel steelDefectDetailModel);
        Task<ApiResponeModel> Update(decimal id, SteelDefectDetailModel steelDefectDetailModel);
        Task<ApiResponeModel> Delete(decimal id);
        Task<bool> DeleteRangeAsyncDefect(string imei);
        Task<IEnumerable<SteelDefectDetailModel>> GetListDefectByImei(string imei);
        Task<ApiResponeModel> Insert(ProductImeiSteelDefectModel productImeiSteelDefectModel);
        Task<ApiResponeModel> DeleteAllDefectByImei(ProductImeiModel productImei);

    }
}
