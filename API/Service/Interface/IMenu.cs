using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IMenu
    {
        Task<IEnumerable<MenuModel>> GetAll();
        Task<ApiResponeModel> Create(MenuModel menuModel);
        Task<ApiResponeModel> Update(int id, MenuModel menuModel);
        Task<ApiResponeModel> Delete(int id);
        Task<IEnumerable<MenuModel>> GetListMenuByMainMenuId(int id);
        Task<ApiResponeModel> GetById(int id);

    }
}
