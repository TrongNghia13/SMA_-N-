using DATA;
using DATA.Infastructure;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/notification")]
    [ApiController]
    public class NotificationController : ControllerBase
    {

        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;


        }

        [Route("send")]
        [HttpPost]
        public async Task<IActionResult> SendNotification(NotificationModel notificationModel)
        {
            var result = await _notificationService.SendNotification(notificationModel);
            return Ok(result);
        }
        [Route("sendByUsername")]
        [HttpPost]
        public async Task<IActionResult> SendNotificationByUsername(string userName, NotificationModel notificationModel)
        {
            var result = await _notificationService.SendNotificationByUsername(userName, notificationModel);
            return Ok(result);
        }
    }
}
