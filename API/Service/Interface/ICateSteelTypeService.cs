using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DATA;
using Model.Models;

namespace Service.Interface
{
    public interface ICateSteelTypeService
    {
        Task<IEnumerable<CateSteelTypeModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateSteelTypeModel cateSteelTypeModel);
        Task<ApiResponeModel> Update(string id, CateSteelTypeModel cateSteelTypeModel);
        Task<ApiResponeModel> Delete(string id);
    }
}