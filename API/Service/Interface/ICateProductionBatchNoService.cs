using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Models;

namespace Service.Interface
{
    public interface ICateProductionBatchNoService
    {

        Task<IEnumerable<CateProductionBatchNoModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateProductionBatchNoModel cateProductionBatchNoModel);
        Task<ApiResponeModel> Update(string id, CateProductionBatchNoModel cateProductionBatchNoModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
