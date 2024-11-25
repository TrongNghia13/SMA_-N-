import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/screens/0301/InformationPopup.dart';
class AppBar0301 extends StatelessWidget implements PreferredSizeWidget {
  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: AppBar(
          backgroundColor: Colors.white, // Đặt màu nền của App Bar thành trắng
          elevation: 0, // Loại bỏ đường viền của App Bar
          centerTitle: true, // Căn giữa tiêu đề
          title: Text(
            AppLocalizations.of(context).myProfile,
            style: TextStyle(
              color: smaColors.blue,
              fontWeight: FontWeight.bold,
            ),
          ),
          actions: [
            IconButton(onPressed: (){
              InformationPopup.showConfirmationDialog(context: context);
            }, icon: Icon(Icons.info_outline,color: smaColors.blue,),tooltip: AppLocalizations.of(context).informationAboutTheApp,)
          ],
          leading: SizedBox(),
        )
    );
  }
}
