using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateProductTypeService
    {
        Task<IEnumerable<CateProductTypeModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateProductTypeModel cateProductTypeModel);
        Task<ApiResponeModel> Update(string id, CateProductTypeModel cateProductTypeModel);
        Task<ApiResponeModel> Delete(string id);
        Task<ApiResponeModel> GetTreeGrid();
        Task<ApiResponeModel> GetDataShowTreeSelect();


    }
}
