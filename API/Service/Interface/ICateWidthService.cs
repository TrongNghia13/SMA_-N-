using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateWidthService
    {
        Task<IEnumerable<CateWidthModel>> GetAll();
        Task<IEnumerable<CateWidthModel>> GetWidthByType(string typeCode);

        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateWidthModel cateWidthModel);
        Task<ApiResponeModel> Update(string id, CateWidthModel cateWidthModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
