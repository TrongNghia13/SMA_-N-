using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IRole
    {
        Task<IEnumerable<RoleModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(RoleModel roleModel);
        Task<ApiResponeModel> Update(int id, RoleModel roleModel);
        Task<ApiResponeModel> Delete(int id);



    }
}
