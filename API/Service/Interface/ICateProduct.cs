using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateProduct
    {
        Task<IEnumerable<CateProductModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateProductModel cateProductModel);
        Task<ApiResponeModel> Update(string id, CateProductModel cateProductModel);
        Task<ApiResponeModel> Delete(string id);
        Task<IEnumerable<CateProductModel>> GetListCateProduct(CateProductModel cateProductModel);
        Task<ApiResponeModel> GetAutoProductID(CateProductTypeModel model);
    }
}
