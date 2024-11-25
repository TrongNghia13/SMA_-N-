import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:group_radio_button/group_radio_button.dart';
import 'package:sma/components/bloc/blocController/steelDefectBloc.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:sma/models/optionOfPartenSteelDefectModel.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/CateSteelDefectModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/bloc/eventController/steelDefectEvent.dart';
import 'package:sma/components/bloc/stateController/steelDefectState.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
import 'FormSteelDefect.dart';
List<CateSteelDefectModel> listCateSteelDefectModel = [];
List<SteelDefectDetailModel> listSteelDefectDetailModel = [];
List<CateSteelDefectModel> listDefectOfProductCate = [];
String defectDescDetailString = '';
List<SteelDefectDetailModel> listEditedDefect = [];
class SelectSteelDefect extends StatefulWidget {
  bool isRoll;
  String imei;
  Function(List<SteelDefectDetailModel>) updateListSteelDefectDetailModel;
  SelectSteelDefect({super.key, required this.isRoll, required this.imei, required this.updateListSteelDefectDetailModel});
  final UserLoginModel userLoginModel = userLoginModelSP;

  @override
  State<SelectSteelDefect> createState() =>
      _SelectSteelDefectState();
}

class _SelectSteelDefectState extends State<SelectSteelDefect> {
  _SelectSteelDefectState();

  late steelDefectBloc _steelDefectBloc;

  @override
  void initState() {
    listCateSteelDefectModel = [];
    listSteelDefectDetailModel = [];
    listDefectOfProductCate = [];
    listEditedDefect = [];
    defectDescDetailString='';
    // TODO: implement initState
    _steelDefectBloc = BlocProvider.of<steelDefectBloc>(context);
    super.initState();
  }

  void _onGetSteelDefectList(bool isRoll) {
    _steelDefectBloc.add(cateDefectHandle(isRoll: isRoll));
  }

  void _onGetListProductImeiDetail(String imei) {
    _steelDefectBloc.add(listDefectProductImeiHandle(imei: imei));
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<steelDefectBloc, steelDefectState>(
      listener: (context, state) {
        if (state.defectList != null && listCateSteelDefectModel.isEmpty) {
          setState(() {
            listCateSteelDefectModel = state.defectList;
          });
        }
        if (state.productImeiDefectList != null) {
          setState(() {
            listSteelDefectDetailModel = state.productImeiDefectList;
            listDefectOfProductCate = [];
          });
        }
        if (listCateSteelDefectModel != null &&
            listSteelDefectDetailModel != null &&
            listDefectOfProductCate.isEmpty) {
          for (var item in listSteelDefectDetailModel) {
            for (var element in listCateSteelDefectModel) {
              if (element.parentId == item.main &&
                  (item.option1 == element.steelDefectId ||
                      item.option2 == element.steelDefectId ||
                      item.option3 == element.steelDefectId ||
                      item.option4 == element.steelDefectId)) {
                listDefectOfProductCate.add(element);
                setDefectDescDetailString(listSteelDefectDetailModel);
              }
            }
          }
        }
        if (defectDescDetailString.isEmpty){
          defectDescDetailString = AppLocalizations.of(context).noData;

        }
      },
      builder: (context, state) {
        if (state.status == steelDefectStateStatus.empty) {
          _onGetSteelDefectList(widget.isRoll);
          return const LinearProgressIndicator();
        } else if (state.status == steelDefectStateStatus.loading) {
          _onGetListProductImeiDetail(widget.imei);
          return const LinearProgressIndicator();
        } else if (state.status ==
            steelDefectStateStatus.loadingListDefectByProductImei) {
          return const LinearProgressIndicator();
        } else if (state.status == steelDefectStateStatus.error ||
            state.status ==
                steelDefectStateStatus.errorListDefectByProductImei) {
          print('${state.status} ${state.message} ');
          return Text(
              '${AppLocalizations.of(context).messageErrorApi} ${state.message!}');
        } else if (listCateSteelDefectModel.isNotEmpty){
          List<CateSteelDefectModel> listParent = listCateSteelDefectModel
              .where((element) =>
              element.defectType!.toLowerCase().trim().contains('main'))
              .toList();
          List<String?> titleOptionList = listCateSteelDefectModel
              .where((element) =>
          !element.defectType!.toLowerCase().trim().contains('main'))
              .map((e) => e.defectType)
              .toSet()
              .toList();
          //tạo danh sách những lỗi có chung parent và option
          List<optionOfPartenSteelDefectModel>
          optionOfPartenSteelDefectModelList = [];
          for (var listAllItem in listCateSteelDefectModel) {
            for (var listParentItem in listParent) {
              for (var titleOptionListItem in titleOptionList) {
                if (listAllItem.parentId == listParentItem.steelDefectId &&
                    listAllItem.defectType!.contains(titleOptionListItem!)) {
                  if (optionOfPartenSteelDefectModelList.isEmpty ||
                      !optionOfPartenSteelDefectModelList.any((element) =>
                      element.optionName == titleOptionListItem &&
                          element.parentId == listAllItem.parentId)) {
                    optionOfPartenSteelDefectModelList.add(
                        optionOfPartenSteelDefectModel(
                            optionName: titleOptionListItem,
                            parentId: listAllItem.parentId!,
                            valueList: [listAllItem]));
                  } else if (optionOfPartenSteelDefectModelList.any((element) =>
                  element.optionName == titleOptionListItem &&
                      element.parentId == listAllItem.parentId)) {
                    for (var item in optionOfPartenSteelDefectModelList) {
                      if (item.parentId == listAllItem.parentId &&
                          item.optionName == titleOptionListItem) {
                        item.valueList?.add(listAllItem);
                      }
                    }
                  }
                }
              }
            }
          }
          // List<CateSteelDefectModel> _listDefectOfProductCate = listDefectOfProductCate;
          return Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                margin: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(3),
                    border: Border.all(color: smaColors.blueLight)),
                child: Column(

                  children: [
                    //Bảng hiển thị chi tiết về các lỗi cuộn
                    Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: listParent.map((value) {
                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Column(
                              children: [
                                const SizedBox(height: 15),
                                Container(
                                    margin: const EdgeInsets.only(left: 10),
                                    child: titleForm(
                                      '${value.defectName}',
                                      fontSize: 18,
                                    ))
                              ],
                            ),
                            Column(
                              children: optionRadio(
                                parentId: value.steelDefectId!,
                                listOptionOfPartenSteelDefectModel:
                                optionOfPartenSteelDefectModelList,
                              ),
                            ),
                          ],
                        );
                      }).toList(),
                    ),
                    //DropList về chi tiết
                    titleForm(AppLocalizations.of(context).detailedDescription),
                    Card(
                      color: smaColors.blue,
                      child: Container(
                          margin: const EdgeInsets.all(10),
                          child: Text(
                            defectDescDetailString,
                            style: const TextStyle(color: Colors.white),
                          )),
                    ),
                  ],
                ),
              ),
            ],
          );
        } else {
          return const CircularProgressIndicator();
        }
      },
    );
  }

  List<Widget> optionRadio(
      {required int parentId,
        required List<optionOfPartenSteelDefectModel>
        listOptionOfPartenSteelDefectModel}) {
    List<Widget> listWiget = [];
    for (var item in listOptionOfPartenSteelDefectModel) {
      if (parentId == item.parentId) {
        listWiget.add(Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: const EdgeInsets.only(left: 20),
              child: Text(item.optionName,
                  style: const TextStyle(
                      color: Colors.deepOrange,
                      fontWeight: FontWeight.bold,
                      fontSize: 14)),
            ),
            Column(
              children: [
                radioButtonGroupSelect(item.valueList!),
              ],
            )
          ],
        ));
      }
    }
    return listWiget;
    //radioButtonSelect(item.valueList!)
  }

  Widget radioButtonGroupSelect(List<CateSteelDefectModel> listItem) {
    CateSteelDefectModel? selectedModel =
    CateSteelDefectModel(steelDefectId: 0);
    for (var item in listItem) {
      for (var value in listDefectOfProductCate) {
        if (item.steelDefectId == value.steelDefectId) {
          selectedModel = value;
          break;
        }
      }
    }
    return Container(
      margin: const EdgeInsets.only(left: 25),
      child: RadioGroup<CateSteelDefectModel>.builder(
          items: listItem,
          itemBuilder: (item) => RadioButtonBuilder(item.defectName!),
          groupValue: selectedModel!,
          onChanged: (value) => setState(() {
            if (value != null) {
              if (selectedModel == value) {
                listDefectOfProductCate.remove(value);
                if(listDefectOfProductCate.isEmpty){
                  setListSteelDefectDetailModel([]);
                }else {
                  updateListSteelDefect(listDefectOfProductCate);
                }
              } else {
                listDefectOfProductCate.remove(selectedModel);
                listDefectOfProductCate.add(value);
                listDefectOfProductCate.sort(
                        (a, b) => a.steelDefectId!.compareTo(b.steelDefectId!));
                updateListSteelDefect(listDefectOfProductCate);
              }
            }
            selectedModel = value;
          })),
    );
  }

  void updateListSteelDefect(List<CateSteelDefectModel> cateList) {
    List<SteelDefectDetailModel> listCloneListEditedDefect = [];
    bool isHave = true;
    for (var item in cateList) {
      isHave = listCloneListEditedDefect
          .any((element) => element.main == item.parentId);
      if ((isHave == false && listCloneListEditedDefect.isNotEmpty) ||
          listCloneListEditedDefect.isEmpty) {
        listCloneListEditedDefect.add(SteelDefectDetailModel(
            steelDefectDetailID: 0,
            imei: widget.imei,
            main: item.parentId!,
            option1: -1,
            option2: -1,
            option3: -1,
            option4: -1,
            steelDefectName: '',
            createdBy: null,
            createdDate: null));
        setListEditedDefect(
            item: item, listCloneListEditedDefect: listCloneListEditedDefect);
      } else if (listCloneListEditedDefect.isNotEmpty) {
        setListEditedDefect(
            item: item, listCloneListEditedDefect: listCloneListEditedDefect);
      }
    }
  }

  void setListEditedDefect(
      {required CateSteelDefectModel item,
        required List<SteelDefectDetailModel> listCloneListEditedDefect}) {
    for (var listEditedDefectItem in listCloneListEditedDefect) {
      if (listEditedDefectItem.main == item.parentId) {
        if (item.defectType == "OPTION1") {
          listEditedDefectItem.steelDefectDetailID = 0;
          listEditedDefectItem.option1 = item.steelDefectId!;
        } else if (item.defectType == "OPTION2") {
          listEditedDefectItem.steelDefectDetailID = 0;
          listEditedDefectItem.option2 = item.steelDefectId!;
        } else if (item.defectType == "OPTION3") {
          listEditedDefectItem.steelDefectDetailID = 0;
          listEditedDefectItem.option3 = item.steelDefectId!;
        } else if (item.defectType == "OPTION4") {
          listEditedDefectItem.steelDefectDetailID = 0;
          listEditedDefectItem.option4 = item.steelDefectId!;
        }
        listEditedDefectItem.steelDefectName = listEditedDefectItem
            .transToStringNormal(bList: listCateSteelDefectModel);
        listEditedDefectItem.createdBy = widget.userLoginModel.UserName;
      }
    }
    //test setState
    setState(() {
      listEditedDefect = listCloneListEditedDefect;
      widget.updateListSteelDefectDetailModel(listEditedDefect);
      setDefectDescDetailString(listEditedDefect);
    });
  }
  void setListSteelDefectDetailModel(List<SteelDefectDetailModel>listCloneListEditedDefect){
    setState(() {
      listEditedDefect = listCloneListEditedDefect;
      widget.updateListSteelDefectDetailModel(listEditedDefect);
      setDefectDescDetailString(listEditedDefect);
    });
  }
  void setDefectDescDetailString(
      List<SteelDefectDetailModel> listSteelDefectDetailModel) {
    defectDescDetailString = '';
    if(listSteelDefectDetailModel.isEmpty){
      defectDescDetailString = AppLocalizations.of(context).emptySteelWarning;
    }
    for (var item in listSteelDefectDetailModel) {
      defectDescDetailString = defectDescDetailString +
          item.transToString(bList: listCateSteelDefectModel);
    }
  }
} // ends