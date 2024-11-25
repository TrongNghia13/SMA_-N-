using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IDeliveryDetailService
    {
        Task<IEnumerable<DeliveryDetailModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(DeliveryDetailModel deliveryDetailModel);
        Task<ApiResponeModel> Update(decimal id, DeliveryDetailModel deliveryDetailModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
