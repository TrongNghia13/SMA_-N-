using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateBusinessService
    {
        Task<IEnumerable<CateBusinessModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateBusinessModel cateBusinessModel);
        Task<ApiResponeModel> Update(string id, CateBusinessModel cateBusinessModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
