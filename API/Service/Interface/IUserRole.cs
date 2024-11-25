using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IUserRole
    {
        Task<IEnumerable<UserRoleModel>> GetListRoleByUserId(int userId);
        Task<IEnumerable<UserRoleModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(UserRoleModel userRoleModel);
        Task<ApiResponeModel> Update(int id, UserRoleModel userRoleModel);
        Task<ApiResponeModel> Delete(int id);

        Task<IEnumerable<MenuAppModel>> GetListRoleAppDetailByUserId(int userId);
    }
}
