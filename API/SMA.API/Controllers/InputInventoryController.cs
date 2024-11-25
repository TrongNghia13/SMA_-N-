
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Model.Models.Inventory;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]

    public class InputInventoryController : ControllerBase
    {

        private readonly IInventoryService _inventoryService;
        private readonly IReceiptService _receiptService;
        public InputInventoryController(IInventoryService inventoryService, IReceiptService receiptService)
        {
            _inventoryService = inventoryService;
            _receiptService = receiptService;
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(InventoryModel inventoryModel)
        {
          var  Update = await  _inventoryService.Inventory(inventoryModel);
            
            if (Update == null || !Update.Success)
            {
                
                return BadRequest(Update);
            }
            return Ok(Update);
        }

        [HttpPost("RollTruckScale")]
        public async Task<IActionResult> RollTruckScale(InventoryModel inventoryModel)
        {
            var Update = await _inventoryService.RollTruckScale(inventoryModel);

            if (Update == null || !Update.Success)
            {

                return BadRequest(Update);
            }
            return Ok(Update);
        }

        [HttpPut("UpdateSteelDefect")]
        public async Task<IActionResult> UpdateSteelDefect(InventoryModel inventoryModel)
        {
            var Update = await _inventoryService.UpdateSteelDefect(inventoryModel);

            if (Update == null || !Update.Success)
            {

                return BadRequest(Update);
            }
            return Ok(Update);
        }


        //[HttpPut("TaskDeliver")]
        //public async Task<IActionResult> TaskDeliver( TaskDeliverAppModel taskDeliverAppModel)
        //{
        //    var TasKDeliver = await _inventoryService.TasKDeliver(taskDeliverAppModel);

        //    if (TasKDeliver == null || !TasKDeliver.Success)
        //    {

        //        return BadRequest(TasKDeliver);
        //    }
        //    return Ok(TasKDeliver);
        //}


    }
}   
