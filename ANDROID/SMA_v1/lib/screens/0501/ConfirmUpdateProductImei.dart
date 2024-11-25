import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/bloc/blocController/blocSearchProductImei.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:sma/components/apiController/ProductImeiRepository.dart';
import 'package:sma/screens/0501/LoadingDialog.dart';
class ConfirmUpdateProductImei {
  static void showConfirmationDialog(
      {required BuildContext context,
      required ProductImeiModel productImeiModel, required List<SteelDefectDetailModel> listSteelDefectDetailModel, required List<XFile> listXFile, required bool isChange}) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(
            AppLocalizations.of(context).acceptTitle,
          ),
          content: Text(AppLocalizations.of(context).confirmMessage),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Xử lý logic khi người dùng xác nhận
                // ...
                // Đóng hộp thoại và thoát khỏi màn hình
                Navigator.of(context).pop();
                showLoadingPage(
                    context: context, productImeiModel: productImeiModel,
                listXFile: listXFile,listSteelDefectDetailModel: listSteelDefectDetailModel,isChange: isChange);
              },
              style: ElevatedButton.styleFrom(
                  primary: Colors.green, onPrimary: Colors.white),
              child: Text(AppLocalizations.of(context).accept),
            ),
            ElevatedButton(
              onPressed: () {
                // Xử lý logic khi người dùng xác nhận
                // ...
                // Đóng hộp thoại và thoát khỏi màn hình
                Navigator.of(context).pop();
              },
              style: ElevatedButton.styleFrom(
                  primary: Colors.red, onPrimary: Colors.white),
              child: Text(AppLocalizations.of(context).cancel),
            ),
          ],
        );
      },
    );
  }
static void showLoadingPage(
    {required BuildContext context,
      required ProductImeiModel productImeiModel,required List<SteelDefectDetailModel> listSteelDefectDetailModel, required List<XFile> listXFile, required bool isChange}) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return BlocProvider(
        create: (context) =>
            blocSearchProductImei(reiRepository: ProductImeiRepository()),
        child: LoadingDialog(productImeiModel: productImeiModel, listXFile: listXFile, listSteelDefectDetailModel: listSteelDefectDetailModel,isChange: isChange),
      );
    },
  );
}
}




