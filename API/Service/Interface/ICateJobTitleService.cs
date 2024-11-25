using Model;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateJobTitleService
    {
        Task<IEnumerable<CateJobTitleModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(CateJobTitleModel cateJobTitleModel);
        Task<ApiResponeModel> Update(int id, CateJobTitleModel cateJobTitleModel);
        Task<ApiResponeModel> Delete(int id);

    }
}
