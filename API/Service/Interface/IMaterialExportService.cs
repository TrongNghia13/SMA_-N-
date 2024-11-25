using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IMaterialExportService
    {
        Task<IEnumerable<MaterialExportModel>> GetAll();
        Task<ApiResponeModel> GetById(decimal id);
       
        Task<ApiResponeModel> Create(MaterialExportModel materialExportModel);
        Task<ApiResponeModel> Update(decimal id, MaterialExportModel materialExportModel);
        Task<ApiResponeModel> Delete(decimal id);
    }
}
