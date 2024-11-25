using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICatePlanTypeService
    {
        Task<IEnumerable<CatePlanTypeModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CatePlanTypeModel catePlanTypeModel);
        Task<ApiResponeModel> Update(string id, CatePlanTypeModel catePlanTypeModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
