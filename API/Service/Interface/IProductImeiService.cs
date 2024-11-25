using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IProductImeiService
    {
        Task<IEnumerable<ProductImeiModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
        Task<ApiResponeModel> Create(ProductImeiModel ProductImeiModel);
        Task<ApiResponeModel> Update(decimal id, ProductImeiModel ProductImeiModel);
        Task<ApiResponeModel> Delete(decimal id);
        Task<ApiResponeModel> GetRollByImei(string imei);
        Task<ApiResponeModel> GetTapeByImei(string imei);
        Task<ApiResponeModel> GetProductByImei(string imei);


    }
}
