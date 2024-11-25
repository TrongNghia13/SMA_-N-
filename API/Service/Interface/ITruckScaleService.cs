using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ITruckScaleService
    {
        Task<IEnumerable<TruckScaleModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(TruckScaleModel truckScaleModel);
        Task<ApiResponeModel> Update(decimal id, TruckScaleModel truckScaleModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
