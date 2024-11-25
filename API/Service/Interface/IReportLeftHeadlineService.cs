using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Models;

namespace Service.Interface
{
    public interface IReportLeftHeadlineService
    {
        Task<IEnumerable<ReportLeftHeadlineModel>> GetAll();

    }
}
