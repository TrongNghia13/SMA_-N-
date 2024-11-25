using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IOrganizationUnit
    {
        Task<IEnumerable<OrganizationUnitModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(OrganizationUnitModel organizationUnitModel);
        Task<ApiResponeModel> Update(int id, OrganizationUnitModel organizationUnitModel);
        Task<ApiResponeModel> Delete(int id);
        Task<ApiResponeModel> GetDataShowTreeSelect();
        Task<ApiResponeModel> GetDataShowTreeGrid();


    }
}
