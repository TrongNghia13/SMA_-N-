using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateStoreService
    {
        Task<IEnumerable<CateStoreModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateStoreModel cateStoreModel);
        Task<ApiResponeModel> Update(string id, CateStoreModel cateStoreModel);
        Task<ApiResponeModel> Delete(string id);
        Task<IEnumerable<CateStoreModel>> GetStoreByTypeBranch(string typeId, string branchId);
    }
}
