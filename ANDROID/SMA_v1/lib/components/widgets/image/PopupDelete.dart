import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sma/components/widgets/image/OptionUpdateImage.dart';
import '../../../models/ProductImeiModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class PopupDelete {
  static void showConfirmationDialog(
      {required BuildContext context,
      required Function(ProductImeiModel, List<XFile>) delete,
      required ProductImeiModel proIModel,
      required String? urlImage,
      required List<XFile> listXFile}) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(AppLocalizations.of(context).acceptTitle),
          content: Text(AppLocalizations.of(context).deleteImageMessage),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Đóng hộp thoại và thoát khỏi màn hình
                if (!urlImage!.contains(OptionUpdateImage.sMALocalUpload)) {
                  proIModel = deleteImageProductImeiModel(
                      urlImage: urlImage, item: proIModel);
                } else {
                  listXFile = deleteImageListXfile(
                      listXFile: listXFile, urlImage: urlImage!);
                }
                delete(proIModel, listXFile);
                Navigator.of(context).pop();
              },
              style: ElevatedButton.styleFrom(
                  primary: Colors.red, onPrimary: Colors.white),
              child: Text(AppLocalizations.of(context).accept),
            ),
            ElevatedButton(
              child: Text(AppLocalizations.of(context).cancel),
              onPressed: () {
                // Xử lý logic khi người dùng không xác nhận
                // Đóng hộp thoại
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  static ProductImeiModel deleteImageProductImeiModel(
      {required ProductImeiModel item, required String? urlImage}) {
    for (int i = 0; i < 1; i++) {
      if (item.image1 != null && item.image1! == urlImage) {
        item.image1 = null;
      }else if (item.image2 != null && item.image2! == urlImage) {
        item.image2 = null;
      }
      else if (item.image3 != null && item.image3! == urlImage) {
        item.image3 = null;
      }
      else if (item.image4 != null && item.image4! == urlImage) {
        item.image4 = null;
      }
    }
    return item;
  }

  static List<XFile> deleteImageListXfile(
      {required List<XFile>? listXFile, required String urlImage}) {
    var value = listXFile!.firstWhere((element) => element.path
        .contains(urlImage.substring(OptionUpdateImage.sMALocalUpload.length)));
    listXFile.remove(value);
    return listXFile;
  }
}
