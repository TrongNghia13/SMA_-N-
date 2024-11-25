using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IOrganizationUnitType
    {
        Task<IEnumerable<OrganizationUnitTypeModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(OrganizationUnitTypeModel organizationUnitTypeModel);
        Task<ApiResponeModel> Update(int id, OrganizationUnitTypeModel organizationUnitTypeModel);
        Task<ApiResponeModel> Delete(int id);
        Task<ApiResponeModel> GetDataShowTreeSelect();



    }
}

