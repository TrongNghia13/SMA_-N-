import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/fake_data/fakeDeliveryRequest.dart';
import 'package:flutter/material.dart';
import 'DeliveryRequestListItemView0401.dart';

class DeliveryRequestListView0401 extends StatelessWidget {
  List<TaskDeliverAppModel>? deliveryRequestList;
  bool isRoll;
  DeliveryRequestListView0401({required this.deliveryRequestList, required this.isRoll});

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: GridView(
            padding: const EdgeInsets.all(12),
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 600,
                mainAxisExtent: 170,
                childAspectRatio: 2 / 0.9,
                crossAxisSpacing: 10, // khoảng cách trái phải
                mainAxisSpacing: 15 // khoảng cách từ trên dưới
                ),
            children: deliveryRequestList!
                .map((e) => DeliveryRequestListItemView0401(deliveryAppRequestItem: e,isRoll: isRoll,))
                .toList()));
  }
}
