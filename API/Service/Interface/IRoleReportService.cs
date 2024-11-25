using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IRoleReportService
    {
        Task<IEnumerable<RoleReportModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(RoleReportModel roleReportModel);
        Task<ApiResponeModel> Update(int id, RoleReportModel roleReportModel);
        Task<ApiResponeModel> Delete(int id);
        Task<ApiResponeModel> TreeReportByRole(int id);
        Task<ApiResponeModel> RoleReportManagerByList(List<RoleReport> listRole);

    }
}
