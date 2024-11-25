using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IMenuAppService
    {
        Task<IEnumerable<MenuAppModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(MenuAppModel MenuAppModel);
        Task<ApiResponeModel> Update(int id, MenuAppModel MenuAppModel);
        Task<ApiResponeModel> Delete(int id);
    }
}
