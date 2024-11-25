using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IRoleMenu
    {
       
        Task<ApiResponeModel> GetByRoleId(int id);
        Task<IEnumerable<RoleMenuModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(RoleMenuModel roleMenuModel);
        Task<ApiResponeModel> Update(int id, RoleMenuModel roleMenuModel);
        Task<ApiResponeModel> Delete(int id);
        Task<IEnumerable<RoleMenuModel>> GetListRoleMenuByRoleId(int roleId);
        Task<ApiResponeModel> GetListMenuByRoleId(int id);
        Task<ApiResponeModel> RoleMenuManagerByList(List<RoleMenu> listRole);

    }
}
