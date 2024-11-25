import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:simple_circular_progress_bar/simple_circular_progress_bar.dart';
import 'package:sma/components/bloc/blocController/TaskDeliverDetailBloc.dart';
import 'package:sma/components/bloc/stateController/TaskDeliverDetailState.dart';
import 'package:sma/components/bloc/eventController/TaskDeliverDetailEvent.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';
import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:sma/components/apiController/TaskDeliverDetailRepository.dart';
import 'package:sma/components/localStore.dart';

class NotificationUploadStatus {
  static void showConfirmationDialog(
      {required BuildContext context,
      required int taskDeliverAppID,
      required String productPlanID,
      required List<ProductOfDeliveryRequest> listProductOfDeliveryRequest, required bool isRoll}) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return BlocProvider(
            create: (context) => TaskDeliverDetailBloc(
                taskDeliverDetailRepository: TaskDeliverDetailRepository()),
            child: AlertDialog(
              title: Text(AppLocalizations.of(context).notification),
              content: LoadingUploadStatus(
                  taskDeliverAppID: taskDeliverAppID,
                  listProductOfDeliveryRequest: listProductOfDeliveryRequest,
                  productPlanID: productPlanID),
              actions: [
                ElevatedButton(
                    style: ElevatedButton.styleFrom(
                        foregroundColor: Colors.white,
                        backgroundColor: Colors.red),
                    onPressed: () {
                      Navigator.of(context).pop();
                      Navigator.of(context).pop();
                      Navigator.of(context)
                          .popAndPushNamed(pageRoutes.checkDeliveryRequest0401,arguments: isRoll);
                    },
                    child: Text(AppLocalizations.of(context).close))
              ],
            ),
          );
        });
  }
}

class LoadingUploadStatus extends StatefulWidget {
  LoadingUploadStatus(
      {Key? key,
      required this.taskDeliverAppID,
      required this.listProductOfDeliveryRequest,
      required this.productPlanID})
      : super(key: key);
  final int taskDeliverAppID;
  final String productPlanID;
  final List<ProductOfDeliveryRequest> listProductOfDeliveryRequest;

  @override
  State<LoadingUploadStatus> createState() => _loadingUploadStatusState();
}

class _loadingUploadStatusState extends State<LoadingUploadStatus> {
  late TaskDeliverDetailBloc _taskDeliverDetailBloc;

  @override
  void initState() {
    _taskDeliverDetailBloc = BlocProvider.of<TaskDeliverDetailBloc>(context);
    // TODO: implement initState
    super.initState();
  }

  void uploadTaskRequest() {
    UserLoginModel userLoginModel = userLoginModelSP;
    TaskDeliverAppModel taskDeliverAppModel = TaskDeliverAppModel(
        taskDeliverAppID: widget.taskDeliverAppID,
        createBy: userLoginModel.UserName,
        productionPlanID: widget.productPlanID);
    _taskDeliverDetailBloc.add(UploadListTaskRequestHandle(
        taskDeliverAppModel: taskDeliverAppModel,
        listProductOfDeliveryRequest: widget.listProductOfDeliveryRequest));
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TaskDeliverDetailBloc, TaskDeliverDetailState>(
      builder: (context, state) {
        if (state.status == TaskDeliverDetailStateStatus.ready) {
          uploadTaskRequest();
          return contentNotification(
              content: AppLocalizations.of(context).serverConnecting);
        } else if (state.status == TaskDeliverDetailStateStatus.loading) {
          return contentNotification(
              content: AppLocalizations.of(context).loading);
        } else if (state.status == TaskDeliverDetailStateStatus.exist) {
          localStore.deleteProductOfDeliveryList(taskDeliverAppID: widget.taskDeliverAppID);
          return contentNotification(
              content: AppLocalizations.of(context).requestCompleted,
              isFinish: true);
        } else if (state.status == TaskDeliverDetailStateStatus.notExist) {
          return contentNotification(
              content: AppLocalizations.of(context).serverErrorConnecting,
              isFinish: true,
              isError: true);
        } else if (state.status == TaskDeliverDetailStateStatus.error) {
          return contentNotification(
              content: AppLocalizations.of(context).serverErrorConnecting,
              isFinish: true,
              isError: true);
        } else {
          return contentNotification(
              content: AppLocalizations.of(context).serverErrorConnecting,
              isFinish: true,
              isError: true);
        }
      },
    );
  }

  Widget contentNotification(
      {required String content, bool isFinish = false, bool isError = false}) {
    return SizedBox(
      height: 155,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          isFinish
              ? (isError
                  ? const Icon(
                      Icons.running_with_errors,
                      color: Colors.red,
                      size: 55,
                    )
                  : const Icon(
                      Icons.check_circle_outline,
                      color: Colors.green,
                      size: 55,
                    ))
              : SimpleCircularProgressBar(
                  backStrokeWidth: 0,
                  mergeMode: true,
                  onGetText: (double value) {
                    return Text('${value.toInt()}%');
                  },
                ),
          const SizedBox(height: 30),
          Text(content)
        ],
      ),
    );
  }
}
