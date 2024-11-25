using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateStandardService
    {
        Task<IEnumerable<CateStandardModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateStandardModel cateStandardModel);
        Task<ApiResponeModel> Update(string id, CateStandardModel cateStandardModel);
        Task<ApiResponeModel> Delete(string id);
    }

}
