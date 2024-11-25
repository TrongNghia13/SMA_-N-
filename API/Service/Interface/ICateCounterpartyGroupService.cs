using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateCounterpartyGroupService
    {
        Task<IEnumerable<CateCounterpartyGroupModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateCounterpartyGroupModel cateCounterpartyGroupModel);
        Task<ApiResponeModel> Update(string id, CateCounterpartyGroupModel cateCounterpartyGroupModel);
        Task<ApiResponeModel> Delete(string id);
        Task<IEnumerable<CateCounterpartyGroupModel>> GetListCounterPartyGroup(string type, bool isChild);
        Task<ApiResponeModel> GetListTreeGridCounterGroup(string? typeId);
    }
}
