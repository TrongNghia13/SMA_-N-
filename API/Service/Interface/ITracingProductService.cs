using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ITracingProductService
    {
        Task<IEnumerable<TracingProductModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(TracingProductModel tracingProductModel);
        Task<ApiResponeModel> Update(decimal id, TracingProductModel tracingProductModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
