import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';
import 'package:simple_circular_progress_bar/simple_circular_progress_bar.dart';
import 'package:sma/components/bloc/eventController/ProductImeiEvent.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/bloc/blocController/blocSearchProductImei.dart';
import 'package:sma/components/bloc/stateController/productImeiState.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
class LoadingDialog extends StatefulWidget {
  final ProductImeiModel productImeiModel;
  List<SteelDefectDetailModel> listSteelDefectDetailModel;
  List<XFile> listXFile;
  bool isChange;
  LoadingDialog({required this.productImeiModel, required this.listXFile, required this.listSteelDefectDetailModel, required this.isChange});

  @override
  _LoadingDialogState createState() => _LoadingDialogState();
}

class _LoadingDialogState extends State<LoadingDialog> {
  late blocSearchProductImei _blocSearchProductImei;

  @override
  void initState() {
    super.initState();
    _blocSearchProductImei = BlocProvider.of<blocSearchProductImei>(context);

  }
  void setDataUpdate(){
    _blocSearchProductImei.add(productImeiUpdateRequest(
        productImeiModel: widget.productImeiModel,
        listSteelDefectDetailModel: widget.listSteelDefectDetailModel,
        listXFile: widget.listXFile,
      isChange: widget.isChange
    ));
  }
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        AppLocalizations.of(context).acceptTitle,
      ),
      content: BlocBuilder<blocSearchProductImei, productImeiState>(
        builder: (context, state) {
          if (state.status == productImeiStateStatus.empty) {
            setDataUpdate();
            return contentState(content: AppLocalizations.of(context).serverConnecting);
          } else if (state.status == productImeiStateStatus.loading) {
            return contentState(content: AppLocalizations.of(context).loading);
          } else if (state.status == productImeiStateStatus.finished){
            return contentState(content: AppLocalizations.of(context).requestCompleted,isFinish: true);
          } else {
            return contentState(content: AppLocalizations.of(context).serverErrorConnecting,isError: true,isFinish: true,);

          }
        },
      ),
      actions: <Widget>[
        ElevatedButton(
          onPressed: () {
            // Xử lý logic khi người dùng xác nhận
            // ...
            // Đóng hộp thoại và thoát khỏi màn hình
            Navigator.of(context).pop();
          },
          style: ElevatedButton.styleFrom(
              foregroundColor: Colors.white, backgroundColor: Colors.red),
          child: Text(AppLocalizations.of(context).close),
        ),
      ],
    );
  }
  Widget contentState({required String content, bool isFinish = false,bool isError = false}){
    return SizedBox(
      height: 150,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          isFinish ?(isError ? const Icon(Icons.running_with_errors, color: Colors.red,size: 55,):const Icon(Icons.check_circle_outline, color: Colors.green,size: 55,)): SimpleCircularProgressBar(
            backStrokeWidth: 0,
            mergeMode: true,
            onGetText: (double value) {
              return Text('${value.toInt()}%');
            },
          ),
          const SizedBox(height: 10,),
          Text(content)
        ],
      ),
    );
  }
}