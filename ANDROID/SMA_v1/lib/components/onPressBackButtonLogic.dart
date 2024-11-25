import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class onPressBackButtonLogic {
  static void showConfirmationDialog({required BuildContext context,VoidCallback?
  navigation}) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(AppLocalizations.of(context).confirm),
          content: Text(AppLocalizations.of(context).questionBackPage),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Đóng hộp thoại và thoát khỏi màn hình
                if(navigation !=null){
                  Navigator.of(context).pop();
                  navigation();
                }else{
                  Navigator.of(context).pop();
                  Navigator.of(context).pop();
                }
              },
              style: ElevatedButton.styleFrom(
                  primary: Colors.red,
                  onPrimary: Colors.white
              ),
              child: Text(AppLocalizations.of(context).accept),
            ),
            ElevatedButton(
              child: Text(AppLocalizations.of(context).cancel),
              onPressed: () {
                // Xử lý logic khi người dùng không xác nhận
                // Đóng hộp thoại
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

}