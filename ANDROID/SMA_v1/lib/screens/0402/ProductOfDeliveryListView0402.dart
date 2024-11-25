import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';
import 'ProductOfDeliveryItemTableView0402.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class ProductOfDeliveryListView0402 extends StatelessWidget {
  List<ProductOfDeliveryRequest>? listProductOfDeliveryRequest;
  Function(String) deleteFunctionEvent;

  ProductOfDeliveryListView0402(
      {super.key, required this.listProductOfDeliveryRequest, required this.deleteFunctionEvent});

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.only(top: 12,left: 25,right: 25),
        child: Column(
          children: [
            Table(
              columnWidths: const {
                0: FlexColumnWidth(1),
                // Cột "STT" sẽ có kích thước nhỏ hơn (ở đây là 1/3 của các cột khác)
                1: FlexColumnWidth(3),
                // Các cột khác có kích thước lớn hơn (ở đây là 2/3)
                2: FlexColumnWidth(1.5),
              },
              children: [
                TableRow( // custom dong dau tien
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: smaColors.blueBox),
                  children: [
                    tableTitle(title: AppLocalizations.of(context).numberNo), // cot 1 hien thi so thu tu
                    tableTitle(title: 'IMEI'), // cot 2 hien thi so imei
                    tableTitle(title: AppLocalizations.of(context).option), //cot 3 hien thi option
                  ],
                ),
                // const TableRow(children: [
                //   Text(''),
                //   Text(''),
                //   Text(''),
                // ]),
              ],
            ),
            Expanded(
              child: ProductOfDeliveryItemTableView0402(
                  listProductOfDeliveryRequest: listProductOfDeliveryRequest,
                  deleteFunctionEvent: deleteFunctionEvent),
            )
          ],
        ));
  }

  Widget tableTitle({String? title}) { // custom Widget co chuc nang hien thi title
    return SizedBox(
      height: 50,
      child: Center(
        child: Text(
          '$title',
          style: const TextStyle(
              fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
        ),
      ),
    );
  }
}
