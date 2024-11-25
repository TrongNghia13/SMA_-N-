using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface INotificationService
    {
        Task<ApiResponeModel> SendNotification(NotificationModel notificationModel);
        Task<ApiResponeModel> SendNotificationByUsername(string userName,NotificationModel notificationModel);

    }
}
