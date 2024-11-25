using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateStoreTypeService
    {
        Task<IEnumerable<CateStoreTypeModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateStoreTypeModel cateStoreTypeModel);
        Task<ApiResponeModel> Update(string id, CateStoreTypeModel cateStoreTypeModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
