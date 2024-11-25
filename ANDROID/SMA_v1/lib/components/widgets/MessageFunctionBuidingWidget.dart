import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

Widget MessageFunctionBuidingWidget(BuildContext context){
  return Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [Icon(
      Icons.build_circle,
      color: smaColors.blue,
      size: 150,
    ),
    Text(AppLocalizations.of(context).functionBuilding,)],
  );
}