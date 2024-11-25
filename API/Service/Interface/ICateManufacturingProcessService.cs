using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateManufacturingProcessService
    {
        Task<IEnumerable<CateManufacturingProcessModel>> GetAll();
        Task<ApiResponeModel> GetById(string id);
        Task<ApiResponeModel> Create(CateManufacturingProcessModel cateManufacturingProcessModel);
        Task<ApiResponeModel> Update(string id, CateManufacturingProcessModel cateManufacturingProcessModel);
        Task<ApiResponeModel> Delete(string id);
    }
}
