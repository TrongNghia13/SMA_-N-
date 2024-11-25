import 'package:flutter/material.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/onPressBackButtonLogic.dart';
class appBar0403 extends StatelessWidget implements PreferredSizeWidget {
  String? taskDeliverAppID;
  String? productionPlanID;
  int? quantity;
  bool isRoll;
  appBar0403({required this.taskDeliverAppID,required this.productionPlanID,required this.quantity, required this.isRoll});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);


  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: AppBar(
            centerTitle: true,
            title: Text(
              "$productionPlanID",
              style: TextStyle(color: smaColors.blue,fontWeight: FontWeight.bold),
            ),
            leading: IconButton(
              icon: Icon(
                Icons.arrow_back_ios,
                color: smaColors.blue,
              ),
              onPressed: () {
                Navigator.of(context).popAndPushNamed(pageRoutes.deliveryRequestRequestDetail0402, arguments: [taskDeliverAppID,productionPlanID,quantity,isRoll]);
              },
              splashColor: Colors.black,
            )
        ));
  }
}

