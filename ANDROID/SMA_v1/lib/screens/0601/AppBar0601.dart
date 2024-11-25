import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/models/ProductImeiModel.dart';
class AppBar0601 extends StatefulWidget implements PreferredSizeWidget {
  late String title;
  late ProductImeiModel productImeiModel;
  AppBar0601({required this.title, required this.productImeiModel});
  @override
  State<AppBar0601> createState() => _appBar0601State();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _appBar0601State extends State<AppBar0601> {

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: AppBar(
          centerTitle: true,
          title: Text(
            "${AppLocalizations.of(context).function5Name} ${widget.title}",
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
