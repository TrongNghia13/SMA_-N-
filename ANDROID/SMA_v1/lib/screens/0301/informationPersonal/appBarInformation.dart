import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/models/ProductImeiModel.dart';
class AppBarInformation extends StatefulWidget implements PreferredSizeWidget {

  @override
  State<AppBarInformation> createState() => _AppBarInformationState();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _AppBarInformationState extends State<AppBarInformation> {

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: AppBar(
          centerTitle: true,
          title: Text(
            "${AppLocalizations.of(context).personalInfomation}",
            style: TextStyle(color: smaColors.blue, fontWeight: FontWeight.bold),
          ),
          leading: IconButton(
            icon: Icon(
              Icons.arrow_back_ios,
              color: smaColors.blue,
            ),
            onPressed: () {
              Navigator.of(context).pop();
            },
            splashColor: Colors.black,
          ),
        ));
  }

}
