using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IUserRoleMobileService
    {
        Task<IEnumerable<UserRoleMobileModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(UserRoleMobileModel userRoleMobileModel);
        Task<ApiResponeModel> Update(int id, UserRoleMobileModel userRoleMobileModel);
        Task<ApiResponeModel> Delete(int id);
    }
}
