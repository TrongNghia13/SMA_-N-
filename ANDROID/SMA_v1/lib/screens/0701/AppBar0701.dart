import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/onPressBackButtonLogic.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/screens/0501/ConfirmUpdateProductImei.dart';
import 'package:sma/models/ProductImeiModel.dart';
class AppBar0701 extends StatefulWidget implements PreferredSizeWidget {
  AppBar0701({super.key});
  @override
  State<AppBar0701> createState() => _AppBar0701State();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _AppBar0701State extends State<AppBar0701> {

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: AppBar(
          backgroundColor: smaColors.pageBackground,
          centerTitle: true,
          title: Text(
            AppLocalizations.of(context).function6Name,
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          leading: IconButton(
            icon: const Icon(
              Icons.arrow_back_ios,
              color: Colors.white,
            ),
            onPressed: () {
              Navigator.of(context).popAndPushNamed(
                  pageRoutes.navigationBar);
            },
            splashColor: Colors.tealAccent,
          ),
        ));
  }

}
