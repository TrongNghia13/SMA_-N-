using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Models;
using Model.Models.Inventory;

namespace Service.Interface
{
    public interface IInventoryService
    {
        Task<ApiResponeModel> Inventory(InventoryModel inventoryModel);
        Task<ApiResponeModel> RollTruckScale(InventoryModel inventoryModel);
        Task<ApiResponeModel> UpdateSteelDefect(InventoryModel inventoryModel);



    }
}
