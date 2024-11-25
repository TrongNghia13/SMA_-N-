import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class AppBar0401 extends StatelessWidget implements PreferredSizeWidget {
  bool isRoll;
  AppBar0401({super.key, required this.isRoll});
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
  @override
  Widget build(BuildContext context) {
    String title ='';
    if(isRoll == true){
      title = AppLocalizations.of(context).function1Name;
    } else {
      title = AppLocalizations.of(context).function3Name;
    }
    return SafeArea(
        child: AppBar(
      centerTitle: true,
      title: Text(
        title,
        style: TextStyle(color: smaColors.blue, fontWeight: FontWeight.bold),
      ),
      leading: IconButton(
        icon: Icon(
          Icons.arrow_back_ios,
          color: smaColors.blue,
        ),
        onPressed: () {
          Navigator.of(context).popAndPushNamed(
              pageRoutes.navigationBar);
        },
        splashColor: Colors.black,
      ),
    ));
  }
}
