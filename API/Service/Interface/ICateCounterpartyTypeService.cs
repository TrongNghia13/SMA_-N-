using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateCounterpartyTypeService
    {
        Task<IEnumerable<CateCounterpartyTypeModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateCounterpartyTypeModel cateCounterpartyTypeModel);
        Task<ApiResponeModel> Update(string id,CateCounterpartyTypeModel cateCounterpartyTypeModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
