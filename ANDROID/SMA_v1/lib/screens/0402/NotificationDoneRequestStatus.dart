import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class NotificationDoneRequestStatus {
  static void showConfirmationDialog(
      BuildContext context, bool isEnough) {

    Text textContent(){
      if(isEnough){
        return Text(AppLocalizations.of(context).requestCompleted,textAlign: TextAlign.center,);
      } else {
        return Text(AppLocalizations.of(context).notEnoughQuantityRequired,textAlign: TextAlign.center,);
      }
    }

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(
            AppLocalizations.of(context).notification,
          ),
          content:  textContent(),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Xử lý logic khi người dùng xác nhận
                // ...
                // Đóng hộp thoại và thoát khỏi màn hình
                Navigator.of(context).pop();
                if(isEnough==true)
                  Navigator.of(context).pop();
              },
              style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.white, backgroundColor: Colors.red),
              child: Text(AppLocalizations.of(context).exit),
            )
          ],
        );
      },
    );
  }

}