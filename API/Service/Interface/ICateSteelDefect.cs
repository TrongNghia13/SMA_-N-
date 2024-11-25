using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateSteelDefect
    {
        Task<IEnumerable<CateSteelDefectModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(CateSteelDefectModel cateSteelDefectModel);
        Task<ApiResponeModel> Update(int id, CateSteelDefectModel cateSteelDefectModel);
        Task<ApiResponeModel> Delete(int id);
        Task<IEnumerable<CateSteelDefectModel>> GetAllRollDefect();
        Task<IEnumerable<CateSteelDefectModel>> GetAllTapeDefect();
        Task<ApiResponeModel> GetListDefectByMarterialType(string marterialType);
        Task<ApiResponeModel> GetAllListDefect();

    }
}
