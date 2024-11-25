import 'package:flutter/material.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class notificationEnoughQuantity {
  static void showConfirmationDialog(
  {required BuildContext context,required String taskDeliverAppID, required String productionPlanID, required int quantity, required isRoll}) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(
            AppLocalizations.of(context).notification,
          ),
          content: Text(
                  AppLocalizations.of(context).enoughRequiredNotification,
                  textAlign: TextAlign.center,
                ),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Xử lý logic khi người dùng xác nhận
                // ...
                // Đóng hộp thoại và thoát khỏi màn hình
                Navigator.of(context).pop();
                Navigator.of(context).popAndPushNamed(
                    pageRoutes.deliveryRequestRequestDetail0402,
                    arguments: [
                      taskDeliverAppID,
                      productionPlanID,
                      quantity,
                      isRoll
                    ]); // xoa man hinh hien tai, load man moi len va gan gia tri
                // Navigator.of(context).popUntil((route) => pageRoutes.deliveryRequestRequestDetail_0402,);
                // Navigator.pop(context, ModalRoute.withName(pageRoutes.deliveryRequestRequestDetail_0402));
              },
              style: ElevatedButton.styleFrom(
                  primary: Colors.red, onPrimary: Colors.white),
              child: Text(AppLocalizations.of(context).close),
            ),
            // ElevatedButton(
            //   child: Text('Không'),
            //   onPressed: () {
            //     // Xử lý logic khi người dùng không xác nhận
            //     // Đóng hộp thoại
            //     Navigator.of(context).pop();
            //   },
            // ),
          ],
        );
      },
    );
  }
}
