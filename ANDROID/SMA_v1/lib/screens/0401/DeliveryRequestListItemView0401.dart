import 'package:flutter/material.dart';
import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class DeliveryRequestListItemView0401 extends StatelessWidget {
  TaskDeliverAppModel? deliveryAppRequestItem;
  bool isRoll;
  DeliveryRequestListItemView0401({super.key, this.deliveryAppRequestItem, required this.isRoll});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      child: Container(
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10), color: smaColors.blueBox),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            rowView(
              title: AppLocalizations.of(context).taskDate,
              content: ': ${deliveryAppRequestItem?.taskDate?.substring(0,10) ?? DateTime.now().toString().substring(0,10)}',
                widthSize: 90
            ),
            rowView(
              title: AppLocalizations.of(context).productionPlanID,
              content: ': ${deliveryAppRequestItem?.productionPlanID ?? AppLocalizations.of(context).noData}',
                widthSize: 90
            ),
            rowView(
              title: AppLocalizations.of(context).vendor,
              content: ': ${deliveryAppRequestItem?.vendor ?? AppLocalizations.of(context).noData}',
                widthSize: 90
            ),

            rowView(
              title: AppLocalizations.of(context).productionBatchNo,
              content: ': ${deliveryAppRequestItem?.productionBatchNo ?? AppLocalizations.of(context).noData}',
                widthSize: 90
            ),
            rowView(
              title: AppLocalizations.of(context).width,
              content: ': ${deliveryAppRequestItem?.width ?? AppLocalizations.of(context).noData}',
              widthSize: 90
            ),
            rowView(
              title: AppLocalizations.of(context).thickness,
              content: ': ${deliveryAppRequestItem?.thickness ?? AppLocalizations.of(context).noData}',
                widthSize: 90
            ),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                  Expanded(
                    flex: 1,
                    child: rowView(
                      title: AppLocalizations.of(context).storeID,
                      content: ': ${deliveryAppRequestItem?.storeID ?? AppLocalizations.of(context).noData}',
                        widthSize: 90
                    ),
                  ),
                Text(AppLocalizations.of(context).quantity,style: const TextStyle(color: Colors.yellow, fontSize: 20)),
                  Container(
                    margin: const EdgeInsets.only(right: 10),
                    child: Text(" ${deliveryAppRequestItem?.quantity.toString() ?? '0'}",
                        style: const TextStyle(
                          color: Colors.yellow,
                          fontWeight: FontWeight.bold,
                          fontSize: 25,
                        )),
                  ),
              ],
            )
          ],
        ),
      ),
      onTap: () {
        //print('bạn đã click mã lô ${this.deliveryAppRequestItem?.maLo}, số lượng ${deliveryAppRequestItem?.soLuongSanPham}');
        Navigator.of(context).pushNamed(
            pageRoutes.deliveryRequestRequestDetail0402,
            arguments: [deliveryAppRequestItem?.taskDeliverAppID.toString(),deliveryAppRequestItem?.productionPlanID, deliveryAppRequestItem?.quantity, isRoll]);
        // Navigator.of(context).push(MaterialPageRoute(builder: (context) => screen_0402(titleScreen: this.deliveryAppRequestItem?.maLo ?? "Vui lòng trở lại trang trước")));
      },
    );
  }

  Widget rowView(
      {String? title,
      String? content,
      double? fontSize,
      String? color,
      Color? colors = Colors.white,
      double? widthSize}) {
    return Row(
      children: [
        Container(
          margin: const EdgeInsets.only(left: 10),
          width: widthSize,
          child: Text("$title",
              style: TextStyle(
                color: colors,
                fontWeight: FontWeight.bold,
                fontSize: fontSize,
              )),
        ),
        Text(
          '$content',
          style: TextStyle(color: colors, fontSize: fontSize),
        )
      ],
    );
  }
}
