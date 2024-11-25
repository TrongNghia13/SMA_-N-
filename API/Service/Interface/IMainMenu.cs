using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IMainMenu
    {
        Task<IEnumerable<MainMenuModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<IEnumerable<MainMenuModel>> GetAllByUserId(int id);
        Task<ApiResponeModel> GetListMenuByUserId(int id);
        Task<ApiResponeModel> Create(MainMenuModel mainMenuModel);
        Task<ApiResponeModel> Update(int id, MainMenuModel mainMenuModel);
        Task<ApiResponeModel> Delete(int id);



    }
}
