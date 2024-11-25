using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IRoleAppService
    {
        Task<IEnumerable<RoleAppModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(RoleAppModel RoleAppModel);
        Task<ApiResponeModel> Update(int id, RoleAppModel RoleAppModel);
        Task<ApiResponeModel> Delete(int id);
        Task<ApiResponeModel> TreeAppByRole(int id);
        Task<ApiResponeModel> RoleAppManagerByList(List<RoleApp> listRole);

    }
}
