using Microsoft.Extensions.Options;
using Model.Models;
using Service.Interface;
using CorePush.Google;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;
using static Model.Models.GoogleNotification;
using DATA.Infastructure;
using DATA;

namespace Service.Implement
{
    public class NotificationService : INotificationService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        private readonly FcmNotificationSetting _fcmNotificationSetting;
        public NotificationService(IUnitOfWork unitOfWork, IOptions<FcmNotificationSetting> settings)
        {
            _unitOfWork = unitOfWork;

            _fcmNotificationSetting = settings.Value;
            _userRepository = _unitOfWork.UserRepository;
        }
        public async Task<ApiResponeModel> SendNotificationByUsername(string userName, NotificationModel notificationModel)
        {
            var user = await _userRepository.GetAsync(c=>c.UserName.ToLower().Trim() == userName.ToLower().Trim());
            notificationModel.DeviceId = user.RegistrationToken;
            return await SendNotification(notificationModel);
        }
        public async Task<ApiResponeModel> SendNotification(NotificationModel notificationModel)
        {
            ApiResponeModel response = new ApiResponeModel();
            try
            {
                if (notificationModel.IsAndroiodDevice)
                {
                    /* FCM Sender (Android Device) */
                    FcmSettings settings = new FcmSettings()
                    {
                        SenderId = _fcmNotificationSetting.SenderId,
                        ServerKey = _fcmNotificationSetting.ServerKey
                    };
                    HttpClient httpClient = new HttpClient();

                    string authorizationKey = string.Format("keyy={0}", settings.ServerKey);
                    string deviceToken = notificationModel.DeviceId;

                    httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", authorizationKey);
                    httpClient.DefaultRequestHeaders.Accept
                            .Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    DataPayload dataPayload = new DataPayload();
                    dataPayload.Title = notificationModel.Title;
                    dataPayload.Body = notificationModel.Body;

                    GoogleNotification notification = new GoogleNotification();
                    notification.Data = dataPayload;
                    notification.Notification = dataPayload;

                    var fcm = new FcmSender(settings, httpClient);
                    var fcmSendResponse = await fcm.SendAsync(deviceToken, notification);

                    if (fcmSendResponse.IsSuccess())
                    {
                        response.Success = true;
                        response.Message = "Notification sent successfully";
                        return response;
                    }
                    else
                    {
                        response.Success = false;
                        response.Message = fcmSendResponse.Results[0].Error;
                        return response;
                    }
                }
                else
                {
                    /* Code here for APN Sender (iOS Device) */
                    //var apn = new ApnSender(apnSettings, httpClient);
                    //await apn.SendAsync(notification, deviceToken);
                }
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Something went wrong";
                return response;
            }
        }
    }
}
