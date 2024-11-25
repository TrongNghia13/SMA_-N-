using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IWorkProcessService
    {
        Task<IEnumerable<WorkProcessModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(WorkProcessModel workProcessModel);
        Task<ApiResponeModel> Update(string id, WorkProcessModel workProcessModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
