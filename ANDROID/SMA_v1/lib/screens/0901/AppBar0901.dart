import 'package:flutter/material.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/smaColors.dart';

class AppBar0901 extends StatefulWidget implements PreferredSizeWidget {
  AppBar0901({super.key});
  @override
  State<AppBar0901> createState() => _AppBar0901State();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _AppBar0901State extends State<AppBar0901> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: AppBar(
        centerTitle: true,
        title: Text(
          AppLocalizations.of(context).notification,
          style: TextStyle(color: smaColors.blue, fontWeight: FontWeight.bold),
        ),
        leading: IconButton(
          icon: Icon(
            Icons.home,
            color: smaColors.blue,
          ),
          onPressed: () {
            Navigator.of(context).popAndPushNamed(
              pageRoutes.navigationBar,
            );
          },
          splashColor: Colors.tealAccent,
        ),
      ),
    );
  }
}
