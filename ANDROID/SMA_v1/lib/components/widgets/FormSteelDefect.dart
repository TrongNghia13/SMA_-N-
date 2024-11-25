import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sma/components/widgets/image/NotificationEnoughImage.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/widgets/DropDownMenu.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/widgets/image/OptionUpdateImage.dart';
import 'image/PopupDelete.dart';
import 'dart:io';
import 'package:sma/components/widgets/SelectSteelDefect.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
import 'package:sma/models/UserLoginModel.dart';

List<String?> listImage = [];
List<bool>? isShowWidget = [];
List<XFile> listXFileImage = [];

class FormSteelDefect extends StatefulWidget {
  late ProductImeiModel proiModel;
  bool isRoll;
  Function(ProductImeiModel) updateProductImeiModel;
  Function(List<SteelDefectDetailModel>) updateListSteelDefectDetailModel;
  Function(List<XFile>) updateListXFile;
  final UserLoginModel userLoginModel = userLoginModelSP;
  FormSteelDefect({required this.proiModel, required this.isRoll, required this.updateProductImeiModel, required this.updateListSteelDefectDetailModel, required this.updateListXFile});

  @override
  _FormSteelDefectState createState() => _FormSteelDefectState();
}

class _FormSteelDefectState extends State<FormSteelDefect> {
  // late List<CateSteelDefectModel> _listCateSteelDefectModel;
  // void updateListCateSteelDefectModel (List<CateSteelDefectModel> listCateSteelDefectModel ){
  //   setState(() {
  //     _listCateSteelDefectModel = listCateSteelDefectModel;
  //     widget.updateListCateSteelDefectModel(listCateSteelDefectModel);
  //   });
  // }
  @override
  void initState() {
    listXFileImage = [];
    isShowWidget = [];
    isShowWidget!.add(true);
    isShowWidget!.add(false);
    isShowWidget!.add(false);
    isShowWidget!.add(false);
    initImage();
    // TODO: implement initState
    super.initState();
  }

  void initImage() {
    listImage = [];
    for (int i = 0; i < 4; i++) {
      String? image = widget.proiModel.image1;
      switch (i) {
        case 1:
          image = widget.proiModel.image2;
          break;
        case 2:
          image = widget.proiModel.image3;
          break;
        case 3:
          image = widget.proiModel.image4;
          break;
      }
      if (image != null && image.trim().isNotEmpty) {
        listImage.add(image);
      }
    }
    for (var item in listXFileImage) {
      listImage.add('${OptionUpdateImage.sMALocalUpload}${item.path}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 10,right: 10,bottom: 10),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            textFieldForm(
                text: widget.proiModel.specification!, readOnly: true),
            DropDownMenu(
                title: titleForm(AppLocalizations.of(context).selectDefect),
                widgetDropDown: SelectSteelDefect(
                    isRoll: widget.isRoll, imei: widget.proiModel.imei!,
                updateListSteelDefectDetailModel: widget.updateListSteelDefectDetailModel),
                isContentVisible: isShowWidget![1],
                isOpen: setListIsShowWidget,
                indexColumn: 1,
                listIsShow: isShowWidget!,
                isEdit: true),
            DropDownMenu(
                title: titleForm(AppLocalizations.of(context).note),
                widgetDropDown: textFieldForm(
                    text: widget.proiModel.note ?? ' ',
                    readOnly: false,
                    maxLength: 1000),
                isContentVisible: isShowWidget![2],
                isOpen: setListIsShowWidget,
                indexColumn: 2,
                listIsShow: isShowWidget!,
                isEdit: true),
            DropDownMenu(
                title: titleForm(AppLocalizations.of(context).image),
                widgetDropDown: imageWidget(),
                isContentVisible: isShowWidget![3],
                isOpen: setListIsShowWidget,
                indexColumn: 3,
                listIsShow: isShowWidget!,
                isEdit: true),
          ],
        ),
      ),
    );
  }

  void setListIsShowWidget(List<bool> newList) {
    setState(() {
      isShowWidget = newList;
    });
  }

  Widget textFieldForm(
      {required String text, required bool readOnly, int? maxLength}) {
    TextEditingController _textEditingController = TextEditingController();
    if (text != null) {
      _textEditingController.text = text;
    }
    return Container(
      margin: const EdgeInsets.all(14),
      decoration: BoxDecoration(
          border: Border.all(width: 1),
          borderRadius: BorderRadius.circular(12),
          color: readOnly ? smaColors.blueBox : Colors.white),
      child: Container(
        margin: const EdgeInsets.only(left: 5, right: 5),
        child: TextField(
          textAlign: readOnly ? TextAlign.center : TextAlign.start,
          maxLength: maxLength,
          controller: _textEditingController,
          readOnly: readOnly,
          decoration: const InputDecoration(
            border: InputBorder.none,
          ),
          style: TextStyle(
              fontSize: 13,
              color: readOnly ? Colors.white : Colors.black,
              fontWeight: readOnly ? FontWeight.bold : FontWeight.normal),
          maxLines: null,
          textAlignVertical: TextAlignVertical.top,
          onSubmitted: (value){
            widget.proiModel.createdBy = widget.userLoginModel.UserName;
              widget.updateProductImeiModel(widget.proiModel);
          },
          onChanged: (value){
            widget.proiModel.note = value;
            widget.proiModel.createdBy = widget.userLoginModel.UserName;
          },
        ),
      ),
    );
  }

  Widget imageWidget() {
    return Container(
      margin: const EdgeInsets.all(15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            margin: const EdgeInsets.only(bottom: 15),
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(13), color: Colors.green),
            child: InkWell(
              onTap: () => OptionUpdateImage.showBottomSheet(
                  context: context,
                  maxImageLength: 4,
                  updateListMethod: setListXFileImage,
                  mediaFileList: listXFileImage,
                  imageExistCount: listImage.length),
              child: Row(
                children: [
                  IconButton(
                      onPressed: () {
                        //option Update Image
                        OptionUpdateImage.showBottomSheet(
                            context: context,
                            maxImageLength: 4,
                            updateListMethod: setListXFileImage,
                            mediaFileList: listXFileImage,
                            imageExistCount: listImage.length);
                      },
                      icon: const Icon(Icons.add_photo_alternate_rounded),
                      color: Colors.white,
                      iconSize: 35,
                      tooltip: AppLocalizations.of(context).addImage),
                  Text(
                    AppLocalizations.of(context).addImage,
                    style: const TextStyle(
                        color: Colors.white, fontWeight: FontWeight.bold),
                  )
                ],
              ),
            ),
          ),
          showListImage(listImage)
        ],
      ),
    );
  }

  void setListXFileImage(List<XFile> newList, bool isFull) {
    if (isFull) {
      NotificationEnoughImage.showConfirmationDialog(context);
    } else {
      setState(() {
        listXFileImage = newList;
        widget.updateListXFile(listXFileImage);
        initImage();
      });
    }
  }

  Widget showListImage(List listImage) {
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 450,
        crossAxisSpacing: 4.0,
        mainAxisSpacing: 4.0,
        childAspectRatio: 3 / 4,
      ),
      itemCount: listImage.length,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemBuilder: (BuildContext context, int index) {
        return Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(13.0),
                color: Colors.white, // Màu nền tùy chọn cho hình ảnh
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(13.0),
                child: listImage[index]
                        .toString()
                        .contains(OptionUpdateImage.sMALocalUpload)
                    ? Image.file(
                        File(listImage[index].toString().substring(
                            OptionUpdateImage.sMALocalUpload.length)),
                        errorBuilder: (BuildContext context, Object error,
                            StackTrace? stackTrace) {
                          return Center(
                              child: Text(AppLocalizations.of(context)
                                  .thisImageTypeIsNotSupported));
                        },
                      )
                    : Image.network(
                        listImage[index] ?? '',
                        fit: BoxFit.contain,
                      ),
              ),
            ),
            Positioned(
              top: 4,
              left: 4,
              child: GestureDetector(
                onTap: () {
                  // Thêm lệnh xử lý khi người dùng nhấp vào dấu X ở đây
                  // Ví dụ: Xóa hình ảnh khỏi GridView
                  PopupDelete.showConfirmationDialog(
                      context: context,
                      urlImage: listImage[index],
                      proIModel: widget.proiModel,
                      delete: setListImage,
                      listXFile: listXFileImage);
                },
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.red,
                  ),
                  child: const Icon(
                    Icons.clear,
                    size: 16,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  void setListImage(ProductImeiModel newProIModel, List<XFile> newList) {
    setState(() {
      widget.proiModel = newProIModel;
      listXFileImage = newList;
      initImage();
      widget.proiModel.createdBy = widget.userLoginModel.UserName;
      widget.updateProductImeiModel(widget.proiModel);
      widget.updateListXFile(listXFileImage);
    });
  }
}
Widget titleForm(String value, {double fontSize = 20, double margin = 0}) {
  return Container(
    margin: EdgeInsets.only(left: margin),
    child: Text(
      value,
      style: TextStyle(fontWeight: FontWeight.bold, fontSize: fontSize),
    ),
  );
}


// Widget formSteelDefect(
//     {required ProductImeiModel proiModel, required bool isRoll}) {
//   return Container(
//     margin: const EdgeInsets.all(10),
//     child: SingleChildScrollView(
//       child: Column(
//         crossAxisAlignment: CrossAxisAlignment.start,
//         children: [
//           DropDownMenu(
//               title: titleForm('Quy cách:'),
//               widgetDropDown: textFieldForm(text: proiModel.specification, readOnly: false),
//               isContentVisible: true),
//           DropDownMenu(
//               title: titleForm('Chọn lỗi cuộn:'),
//               widgetDropDown: selectSteelDefect(
//                 isRoll: isRoll,
//                 imei: proiModel.imei,
//               ),
//               isContentVisible: true),
//           DropDownMenu(
//               title: titleForm('Mô tả chi tiết:'),
//               widgetDropDown: textFieldForm(text: defectDescDetailString, readOnly: true),
//               isContentVisible: true),
//           DropDownMenu(
//               title: titleForm('Ghi chú:'),
//               widgetDropDown:
//                   textFieldForm(text: proiModel.description, readOnly: false, maxLength: 1000),
//               isContentVisible: true),
//           DropDownMenu(
//               title: titleForm('Hình ảnh:'),
//               widgetDropDown: Container(),
//               isContentVisible: true),
//         ],
//       ),
//     ),
//   );
// }
// listImage = [];
// for(int i=0;i<1;i++){
//   if(widget.proiModel.image1 != null){
//     widget.proiModel.image1 = widget.proiModel.image1!.trim();
//   } if(widget.proiModel.image2 != null){
//     widget.proiModel.image2 = widget.proiModel.image2!.trim();
//   } if(widget.proiModel.image3 != null){
//     widget.proiModel.image3 = widget.proiModel.image3!.trim();
//   } if(widget.proiModel.image4 != null){
//     widget.proiModel.image4 = widget.proiModel.image4!.trim();
//   }
//   listImage.add(widget.proiModel.image1);
//   listImage.add(widget.proiModel.image2);
//   listImage.add(widget.proiModel.image3);
//   listImage.add(widget.proiModel.image4);
//   listImage.removeWhere((element) => element == null || element.isEmpty);
//   print(listImage);
// }
