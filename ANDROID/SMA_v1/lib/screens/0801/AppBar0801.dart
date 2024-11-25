import 'package:flutter/material.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/smaColors.dart';

class AppBar0801 extends StatefulWidget implements PreferredSizeWidget {
  AppBar0801({super.key});
  @override
  State<AppBar0801> createState() => _AppBar0801State();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _AppBar0801State extends State<AppBar0801> {

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: AppBar(
          centerTitle: true,
          title: Text(
            AppLocalizations.of(context).phone,
            style: TextStyle(color: smaColors.blue, fontWeight: FontWeight.bold),
          ),
          leading: IconButton(
            icon: Icon(
              Icons.home,
              color: smaColors.blue,
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
