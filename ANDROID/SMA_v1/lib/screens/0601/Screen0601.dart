import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import 'package:sma/components/apiController/ProductImeiRepository.dart';
import 'package:sma/components/bloc/blocController/blocSearchProductImei.dart';
import 'package:sma/components/bloc/blocController/steelDefectBloc.dart';
import 'package:sma/components/bloc/stateController/productImeiState.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/components/widgets/SearchImeiBarWidget.dart';
import 'package:sma/components/apiController/steelDefectRepository.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/screens/0601/AppBar0601.dart';
import 'package:sma/screens/0601/TabBar0601.dart';
import 'package:sma/models/StringDefectModel.dart';
import 'package:sma/components/pageRoutes.dart';

class Screen0601 extends StatefulWidget {
  const Screen0601({Key? key}) : super(key: key);

  @override
  State<Screen0601> createState() => _Screen0601State();
}

class _Screen0601State extends State<Screen0601> {
  late ProductImeiModel _piModel;
  final ProductImeiRepository _ProductImeiRepository = ProductImeiRepository();
  final steelDefectRepository _steelDefectRepository = steelDefectRepository();
  late bool isUpload;
  @override
  void initState() {
    isUpload = false;
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

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      // Bắt sự kiện khi người dùng trở về ko phải trên appbar mà bằng thanh điều hướng
        child: Scaffold(
          appBar: AppBar0601(title: AppLocalizations.of(context).roll,productImeiModel: _piModel),
          // gán appBar bằng template đã tạo trước đó và gán title là mã lô
          body: MultiProvider(
            providers: [
              BlocProvider(
                  create: (context) =>
                      blocSearchProductImei(reiRepository: _ProductImeiRepository)),
              ChangeNotifierProvider<StringDefectModel>(
                create: (context) => StringDefectModel(),
              ),
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
                      SearchImeiBarWidget(isRoll: null),
                      const Expanded(
                        child: Center(
                          child: CircularProgressIndicator(),
                        ),
                      )
                    ],
                  );
                } else if (state.status == productImeiStateStatus.empty) {
                  return Column(
                    children: [
                      SearchImeiBarWidget(isRoll: null),
                      Expanded(child: Text(AppLocalizations.of(context).pleaseEnterImei))
                    ],
                  );
                } else if (state.status == productImeiStateStatus.error ||
                    state.status == productImeiStateStatus.notExist) {
                  return Column(
                    children: [
                      SearchImeiBarWidget(isRoll: null),
                      Expanded(child: Text(AppLocalizations.of(context).messageErrorApi))
                    ],
                  );
                } else {
                  return Column(
                    children: [
                      SearchImeiBarWidget(isRoll: null),
                      Expanded(
                          child: BlocProvider(
                            create: (context) =>
                                steelDefectBloc(sdrRepository: _steelDefectRepository),
                            child: TabBarPage(piModel: _piModel),
                          )),
                    ],
                  );
                }
              },
            ),
          ),
        ),
      onWillPop: () async {
        Navigator.of(context).popAndPushNamed(pageRoutes.navigationBar);
        return false;
      });
  }
}



