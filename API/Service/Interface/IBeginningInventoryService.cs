using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IBeginningInventoryService
    {
        Task<IEnumerable<BeginningInventoryModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(BeginningInventoryModel beginningInventoryModel);
        Task<ApiResponeModel> Update(decimal id, BeginningInventoryModel beginningInventoryModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
