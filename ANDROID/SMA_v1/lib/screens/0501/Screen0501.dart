import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:sma/components/apiController/ProductImeiRepository.dart';
import 'package:sma/components/bloc/blocController/blocSearchProductImei.dart';
import 'package:sma/components/bloc/blocController/steelDefectBloc.dart';
import 'package:sma/components/bloc/stateController/productImeiState.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:sma/screens/0501/AppBar0501.dart';
import 'package:sma/components/widgets/SearchImeiBarWidget.dart';
import 'package:sma/components/widgets/FormSteelDefect.dart';
import 'package:sma/components/apiController/steelDefectRepository.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/onPressBackButtonLogic.dart';
import 'package:sma/components/pageRoutes.dart';
class Screen0501 extends StatefulWidget {
  Screen0501({Key? key}) : super(key: key);
  late bool isRoll;
  @override
  State<Screen0501> createState() => _Screen0501State();
}

class _Screen0501State extends State<Screen0501> {
  late ProductImeiModel _piModel;
  final ProductImeiRepository _ProductImeiRepository = ProductImeiRepository();
  final steelDefectRepository _steelDefectRepository = steelDefectRepository();
  late bool isUpload;
  List<SteelDefectDetailModel> _listSteelDefectDetailModel =[];
  List<XFile> _listXFile =[];
  late bool isChange;
  @override
  void initState() {
    isUpload = false;
    isChange = false;
    _piModel = ProductImeiModel(productImeiID: 0);
    // _getProductById(); // Fetch branches from the API
    // Disable screen rotation
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    //_blocSearchProductImei = BlocProvider.of<blocSearchProductImei>(context);
    super.initState();
  }

// }
  void getProductValue(ProductImeiModel reValue) {
    setState(() {
      _piModel = reValue;
      isUpload = true;
    });
  }
  void setListSteelDefectDetailModel(List<SteelDefectDetailModel> listSteelDefectDetailModel){
    setState(() {
      _listSteelDefectDetailModel = listSteelDefectDetailModel;
      isChange = true;
    });
  }
  void setListXFile(List<XFile> listXFile){
    setState(() {
      _listXFile = listXFile;
    });
  }
  @override
  Widget build(BuildContext context) {
    widget.isRoll = ModalRoute.of(context)?.settings.arguments as bool;
    String title ='';
    if(widget.isRoll == true){
      title = AppLocalizations.of(context).roll;
    } else {
      title = AppLocalizations.of(context).tape;
    }
    return WillPopScope(
        // Bắt sự kiện khi người dùng trở về ko phải trên appbar mà bằng thanh điều hướng
        child: Scaffold(
          appBar: AppBar0501(
              title: title,
              isUpload: isUpload,
              productImeiModel: _piModel,
          listSteelDefectDetailModel: _listSteelDefectDetailModel,
          listXFile: _listXFile,
          isChange: isChange),
          // gán appBar bằng template đã tạo trước đó và gán title là mã lô
          body: MultiProvider(
            providers: [
              BlocProvider(
                  create: (context) => blocSearchProductImei(
                      reiRepository: _ProductImeiRepository)),
            ],
            child: BlocConsumer<blocSearchProductImei, productImeiState>(
              listener: (context, state) {
                if (state.status == productImeiStateStatus.exist) {
                  getProductValue(state.data);
                }
              },
              builder: (context, state) {
                if (state.status == productImeiStateStatus.loading) {
                  return Column(
                    children: [
                      SearchImeiBarWidget(isRoll: widget.isRoll),
                      const Expanded(
                        child: Center(
                          child: CircularProgressIndicator(
                            color: Colors.redAccent,
                          ),
                        ),
                      )
                    ],
                  );
                } else if (state.status == productImeiStateStatus.empty) {
                  return Column(
                    children: [
                      SearchImeiBarWidget(isRoll: widget.isRoll),
                      Expanded(
                          child: Text(
                              AppLocalizations.of(context).pleaseEnterImei))
                    ],
                  );
                } else if (state.status == productImeiStateStatus.error ||
                    state.status == productImeiStateStatus.notExist) {
                  return Column(
                    children: [
                      SearchImeiBarWidget(isRoll: widget.isRoll),
                      Expanded(
                          child: Text(
                              AppLocalizations.of(context).messageErrorApi))
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      SearchImeiBarWidget(isRoll: widget.isRoll),
                      Expanded(
                          child: BlocProvider(
                        create: (context) => steelDefectBloc(
                            sdrRepository: _steelDefectRepository),
                        child: FormSteelDefect(
                            proiModel: _piModel,
                            isRoll: widget.isRoll,
                            updateProductImeiModel: getProductValue,
                        updateListSteelDefectDetailModel: setListSteelDefectDetailModel,
                        updateListXFile: setListXFile),
                      )),
                    ],
                  );
                }
              },
            ),
          ),
        ),
        onWillPop: () async {
          onPressBackButtonLogic.showConfirmationDialog(
            context: context,
            navigation: () =>
                Navigator.of(context).popAndPushNamed(pageRoutes.navigationBar),
          ); // hiện thông báo xác nhận
          return false; // không trở về màn trước tự động
        });
  }
}
