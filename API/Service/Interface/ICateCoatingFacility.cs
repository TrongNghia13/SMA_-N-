using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICateCoatingFacility
    {
        Task<IEnumerable<CateCoatingFacility>> GetAll();
        Task<CateCoatingFacility> GetById(string id);
        Task Add(CateCoatingFacilityModel cateCoatingFacilityModel);
        Task Update(CateCoatingFacilityModel cateCoatingFacilityModel);
        Task<bool> IsExists(string id);
        Task Delete(string id);
    }
}
