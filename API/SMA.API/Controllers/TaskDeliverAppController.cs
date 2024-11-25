using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class TaskDeliverAppController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly ITaskDeliverAppService _taskDeliverAppService;
        private readonly IMapper _mapper;
        public TaskDeliverAppController(ITaskDeliverAppService taskDeliverAppService, IMapper mapper, INotificationService notificationService)
        {
            _taskDeliverAppService = taskDeliverAppService;
            _mapper = mapper;
            _notificationService = notificationService;
        }
        [HttpGet("GetListTaskDeliverAppByBranchId/{branchId}&{fromDate}&{toDate}&{steelType}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListTaskDeliverAppByBranchId(string branchId,string fromDate, string toDate,string steelType)
        {
            var listValue = await _taskDeliverAppService.GetListTaskDeliverAppByBranchId(branchId, fromDate, toDate, steelType);
            return Ok(listValue);
        }
        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateTaskDeliverApp(TaskDeliverAppModel TaskDeliverAppModel)
        {
            try
            {
            TaskDeliverAppModel.CreatedDate = DateTime.Now;
            var createStatus = await _taskDeliverAppService.Create(TaskDeliverAppModel);

            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            
                if (TaskDeliverAppModel.IsFinish == false)
                {
                    var notificationStatus = await _notificationService.SendNotificationByUsername(TaskDeliverAppModel?.UserName!, new NotificationModel { IsAndroiodDevice = true, Body = "Bạn nhận được yêu cầu từ kế hoạch " + TaskDeliverAppModel?.ProductionPlanID, Title = "SMA Thông báo" });
                    //if (notificationStatus == null || !notificationStatus.Success)
                    //{
                    //    return BadRequest(notificationStatus);
                    //}
                }
                return Ok(createStatus);
            }
            catch
            {
                return BadRequest();

            }
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateTaskDeliverApp(decimal id, TaskDeliverAppModel TaskDeliverAppModel)
        {
            try
            {
                var updateStatus = await _taskDeliverAppService.Update(id, TaskDeliverAppModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
                if (TaskDeliverAppModel.IsFinish == false)
                {
                    var notificationStatus = await _notificationService.SendNotificationByUsername(TaskDeliverAppModel?.UserName!, new NotificationModel { IsAndroiodDevice = true, Body = "Yêu cầu từ kế hoạch " + TaskDeliverAppModel?.ProductionPlanID + " đã thay đổi, vui lòng kiểm tra!", Title = "SMA Thông báo" });
                    //if (notificationStatus == null || !notificationStatus.Success)
                    //{
                    //    return BadRequest(notificationStatus);
                    //}
                }
                return Ok(updateStatus);
            }
            catch
            {
                return BadRequest();

            }
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteTaskDeliverApp(decimal id)
        {
            var deleteStatus = await _taskDeliverAppService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetListByUsername/{username}&{branchId}&{materialType}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListByUsername(string username, string branchId, string materialType)
        {
            try
            {
                var listValue = await _taskDeliverAppService.GetListByUsername(username, branchId, materialType);
                return Ok(listValue);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetReceiptNoTaskApp/{planType}&{dateReceipt}")]
        public async Task<IActionResult> GetReceiptNoTaskApp(string planType, string dateReceipt)
        {
            var status = await _taskDeliverAppService.GetReceiptNoTaskApp(planType, dateReceipt);
            if (status == null || !status.Success)
            {
                return NotFound(status);
            }
            return Ok(status);
        }
        [HttpPost("GetListProductImeiByPlanId")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListProductImeiByPlanId(string planId)
        {
            try
            {
                var listValue = await _taskDeliverAppService.GetListProductImeiByPlanId(planId);
                return Ok(listValue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}



