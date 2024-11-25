using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IUserBranchService
    {
        Task<IEnumerable<UserBranchModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(UserBranchModel userBranchModel);
        Task<ApiResponeModel> Update(int id, UserBranchModel userBranchModel);
        Task<ApiResponeModel> Delete(int id);
    }
}
