using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IBranchService
    {
        Task<IEnumerable<BranchModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(BranchModel branchModel);
        Task<ApiResponeModel> Update(string id, BranchModel branchModel);
        Task<ApiResponeModel> Delete(string id);

    }
}
