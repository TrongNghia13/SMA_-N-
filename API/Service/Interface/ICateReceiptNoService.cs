using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateReceiptNoService
    {
        Task<IEnumerable<CateReceiptNoModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateReceiptNoModel cateReceiptNoModel);
        Task<ApiResponeModel> Update(string id, CateReceiptNoModel cateReceiptNoModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
