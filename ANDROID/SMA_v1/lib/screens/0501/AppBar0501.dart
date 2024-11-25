import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/onPressBackButtonLogic.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/screens/0501/ConfirmUpdateProductImei.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';

class AppBar0501 extends StatefulWidget implements PreferredSizeWidget {
  late String title;
  late bool isUpload;
  late ProductImeiModel productImeiModel;
  late List<SteelDefectDetailModel> listSteelDefectDetailModel;
  late List<XFile> listXFile;
  late bool isChange;
  AppBar0501(
      {required this.title,
      required this.isUpload,
      required this.productImeiModel,
      required this.listSteelDefectDetailModel,
      required this.listXFile,
      required this.isChange});

  @override
  State<AppBar0501> createState() => _appBar0501State();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _appBar0501State extends State<AppBar0501> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: AppBar(
      centerTitle: true,
      title: Text(
        "${AppLocalizations.of(context).captureDefect} ${widget.title}",
        style: TextStyle(color: smaColors.blue, fontWeight: FontWeight.bold),
      ),
      leading: IconButton(
        icon: Icon(
          Icons.arrow_back_ios,
          color: smaColors.blue,
        ),
        onPressed: () => onPressBackButtonLogic.showConfirmationDialog(
          context: context,
          navigation: () =>
              Navigator.of(context).popAndPushNamed(pageRoutes.navigationBar),
        ),
        splashColor: Colors.black,
      ),
      actions: [
        if (widget.isUpload)
          IconButton(
              onPressed: () {
                ConfirmUpdateProductImei.showConfirmationDialog(
                    context: context,
                    productImeiModel: widget.productImeiModel,
                listSteelDefectDetailModel: widget.listSteelDefectDetailModel,
                listXFile: widget.listXFile,
                isChange: widget.isChange);
              },
              icon: const Icon(
                Icons.done_all_rounded,
                color: Colors.green,
              ))
      ],
    ));
  }
}
