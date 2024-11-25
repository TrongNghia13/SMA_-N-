using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Models;

namespace Service.Interface
{
    public interface ICateGalvanizedOrganizationService
    {
        Task<IEnumerable<CateGalvanizedOrganizationModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateGalvanizedOrganizationModel cateGalvanizedOrganizationModel);
        Task<ApiResponeModel> Update(string id, CateGalvanizedOrganizationModel cateGalvanizedOrganizationModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
