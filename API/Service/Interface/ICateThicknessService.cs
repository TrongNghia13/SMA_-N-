using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateThicknessService
    {
        Task<IEnumerable<CateThicknessModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateThicknessModel cateThicknessModel);
        Task<ApiResponeModel> Update(string id, CateThicknessModel cateThicknessModel);
        Task<ApiResponeModel> Delete(string id);

    }

}
