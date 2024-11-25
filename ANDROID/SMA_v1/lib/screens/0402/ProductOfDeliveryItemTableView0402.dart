import 'package:flutter/material.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class ProductOfDeliveryItemTableView0402 extends StatelessWidget {
  List<ProductOfDeliveryRequest>? listProductOfDeliveryRequest;
  Function(String) deleteFunctionEvent;

  ProductOfDeliveryItemTableView0402(
      {super.key, required this.listProductOfDeliveryRequest, required this.deleteFunctionEvent});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(
          height: 15,
        ),
        Expanded(
            child: SingleChildScrollView(
          child: Table(
            columnWidths: const {
              0: FlexColumnWidth(0.7),
              // Cột "STT" sẽ có kích thước nhỏ hơn (ở đây là 1/3 của các cột khác)
              1: FlexColumnWidth(3),
              // Các cột khác có kích thước lớn hơn (ở đây là 2/3)
              2: FlexColumnWidth(1.8),
            },
            children: [
              for (ProductOfDeliveryRequest item
                  in listProductOfDeliveryRequest!)
                tableRow(
                    imei: item.imei,
                    soThuTu: item.sttSanPham,
                    context: context,
                        deleteFunctionEvent:
                deleteFunctionEvent)
            ],
          ),
        )),
      ],
    );
  }


  TableRow tableRow(
      {int? soThuTu = 0,
      String? imei = '',
      required BuildContext context,
      required void Function(String
      deleteFunctionEvent)
      deleteFunctionEvent}) {
    return TableRow(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(13),
          border: Border.all(width: 1, color: Colors.black12)),
      children: [
        tableCell(value: soThuTu.toString()),
        tableCell(value: imei),
        deleteButton(
            context: context, imei: imei,
    deleteFunctionEvent:
deleteFunctionEvent),
      ],
    );
  }

  Widget tableCell({String? value}) {
    return SizedBox(
      height: 60,
      child: Center(child: Text('$value')),
    );
  }

  Widget deleteButton( // widget chua nut Xoa va xu ly su kien
      {String? imei,
      required BuildContext context,
      required void Function(String
      deleteFunctionEvent)
      deleteFunctionEvent}) {
    return Container(
      margin: const EdgeInsets.only(right: 5),
      child: ElevatedButton(

        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.red[200],
        ),
        onPressed: () {
          print('Xoá imei ${imei} ');
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text(AppLocalizations.of(context).confirm),
                content: Text('${AppLocalizations.of(context).deleteConfirm} "${imei}" ${AppLocalizations.of(context).no}?'),
                actions: <Widget>[
                  ElevatedButton(
                    onPressed: () {
                      deleteFunctionEvent!(imei!); // callback xoa du lieu reload lai trang
                      Navigator.of(context).pop(); // tat popup
                    },
                    style: ElevatedButton.styleFrom(
                        foregroundColor: Colors.white, backgroundColor: Colors.red),
                    child: Text(AppLocalizations.of(context).yes),
                  ),
                  ElevatedButton(
                    child: Text(AppLocalizations.of(context).no),
                    onPressed: () {
                      Navigator.of(context).pop(); // tap popup
                    },
                  ),
                ],
              );
            },
          );
        },
        child: Text(
          AppLocalizations.of(context).delete,
          style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
    );
  }
}
