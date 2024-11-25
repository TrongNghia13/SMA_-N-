import 'package:flutter/material.dart';
import 'package:sma/components/localStore.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/onPressBackButtonLogic.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';
import 'package:sma/screens/0402/NotificationDoneRequestStatus.dart';
import 'NotificationUploadStatus.dart';
class AppBar0402 extends StatefulWidget implements PreferredSizeWidget {
  String? productionPlanID;
  bool? isEnableQrButton;
  String? taskDeliverAppID;
  int? quantity;
  bool isRoll;
  AppBar0402({super.key, this.productionPlanID, this.quantity = 0,this.isEnableQrButton = true,this.taskDeliverAppID, required this.isRoll});

  @override
  State<AppBar0402> createState() => _AppBar0402State();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

}

class _AppBar0402State extends State<AppBar0402> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
          child: AppBar(
            centerTitle: true,
        title: Text(
            "${widget.productionPlanID}",
            style: TextStyle(color: smaColors.blue,fontWeight: FontWeight.bold),
          ),
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color: smaColors.blue,
          ),
          onPressed: () {
            onPressBackButtonLogic.showConfirmationDialog(context: context);
          },
          splashColor: Colors.black,
        ),
        actions: [
              IconButton(onPressed: () {
                if(localStore.getListProductOfDeliveryRequest(taskDeliverAppID: widget.taskDeliverAppID)!.length != widget.quantity){
                  NotificationDoneRequestStatus.showConfirmationDialog(context, false);
                } else {
                  List<ProductOfDeliveryRequest> listProductOfDeliveryRequest = localStore.getListProductOfDeliveryRequest(taskDeliverAppID: widget.taskDeliverAppID);
                  print('$listProductOfDeliveryRequest, ${widget.productionPlanID!} ${widget.taskDeliverAppID!} ');
                  NotificationUploadStatus.showConfirmationDialog(context: context,listProductOfDeliveryRequest: listProductOfDeliveryRequest,productPlanID: widget.productionPlanID!, taskDeliverAppID: int.parse(widget.taskDeliverAppID!),isRoll: widget.isRoll);
                }
              }, icon: const Icon(Icons.done_all,color: Colors.green,)),
        ],
      ),
    );
  }
}
