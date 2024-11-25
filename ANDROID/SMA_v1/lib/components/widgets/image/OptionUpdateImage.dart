import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class OptionUpdateImage {
  // static File? imageFile;
  static const String sMALocalUpload = 'SMALocalUpload';

  static void showBottomSheet(
      {required BuildContext context,
      required Function(List<XFile>, bool) updateListMethod,
      required List<XFile> mediaFileList,
      required int maxImageLength,
      required int imageExistCount}) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              ListTile(
                leading: const Icon(Icons.camera, color: Colors.teal),
                title: Text(AppLocalizations.of(context).captureFromCamera),
                onTap: () {
                  // Xử lý khi chọn "Chụp từ Camera"
                  getImage(
                      source: ImageSource.camera,
                      updateListMethod: updateListMethod,
                      mediaFileList: mediaFileList,
                      imageExistCount: imageExistCount,
                      maxImageLength: maxImageLength,
                      context: context);
                  Navigator.pop(context); // Đóng bảng chọn
                },
              ),
              ListTile(
                leading: const Icon(Icons.photo_library, color: Colors.teal),
                title: Text(AppLocalizations.of(context).takenFromLibrary),
                onTap: () {
                  getImage(
                      source: ImageSource.gallery,
                      updateListMethod: updateListMethod,
                      mediaFileList: mediaFileList,
                      imageExistCount: imageExistCount,
                      maxImageLength: maxImageLength,
                      context: context);
                  // Xử lý khi chọn "Lấy từ Thư viện"
                  Navigator.pop(context); // Đóng bảng chọn
                },
              ),
            ],
          ),
        );
      },
    );
  }

  static void getImage(
      {required ImageSource source,
      required Function(List<XFile>, bool) updateListMethod,
      required List<XFile> mediaFileList,
      required int maxImageLength,
      required int imageExistCount,
      required BuildContext context}) async {
    List<XFile>? listFile = [];
    if (source.name == 'camera') {
      final XFile? file = await ImagePicker().pickImage(source: source);
      if (file != null) {
        listFile?.add(file);
        _setImageFileListFromListFile(
            value: listFile,
            updateListMethod: updateListMethod,
            mediaFileList: mediaFileList,
            imageExistCount: imageExistCount,
            maxImageLength: maxImageLength,
            context: context);
      }
    } else if (source.name == 'gallery') {
      listFile = await ImagePicker().pickMultiImage();
      _setImageFileListFromListFile(
          value: listFile,
          updateListMethod: updateListMethod,
          mediaFileList: mediaFileList,
          imageExistCount: imageExistCount,
          maxImageLength: maxImageLength,
          context: context);
    }
  }

  static void _setImageFileListFromListFile(
      {required List<XFile>? value,
      required Function(List<XFile>, bool) updateListMethod,
      required List<XFile> mediaFileList,
      required int maxImageLength,
      required int imageExistCount,
      required BuildContext context}) {
    int totalImage = value!.length + imageExistCount;
    print(totalImage <= maxImageLength);
    if (totalImage <= maxImageLength) {
      for (var item in value) {
        mediaFileList?.add(item);
      }
      updateListMethod(mediaFileList!, false);
    } else {
      updateListMethod(mediaFileList!, true);
    }
  }
}
