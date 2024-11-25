using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateMonthService
    {
        Task<IEnumerable<CateMonthModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateMonthModel cateMonthModel);
        Task<ApiResponeModel> Update(CateMonthModel cateMonthModel);
        Task<ApiResponeModel> Delete(string id);
        Task<ApiResponeModel> CheckMonthIsOpen(string receiptDate);

    }
}
