using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateCounterpartyService
    {
        Task<IEnumerable<CateCounterpartyModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateCounterpartyModel cateCounterpartyModel);
        Task<ApiResponeModel> Update(string id, CateCounterpartyModel cateCounterpartyModel);
        Task<ApiResponeModel> Delete(string id);
        Task<IEnumerable<CateCounterpartyModel>> GetVendorByGroupId(string groupId);
        Task<IEnumerable<CateCounterpartyModel>> GetListCouterByTypeAndGroup(string typeId, string groupId);

    }
}
