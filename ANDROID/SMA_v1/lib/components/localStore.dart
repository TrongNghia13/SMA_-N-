import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';

class localStore {
  static late SharedPreferences prefs;

  static List<ProductOfDeliveryRequest> getListProductOfDeliveryRequest(
      {required String? taskDeliverAppID}) {
    List<ProductOfDeliveryRequest> list = [];
    final String? jsonString = prefs.getString('$taskDeliverAppID');
    if (jsonString != null) {
      final jsonList = jsonDecode(jsonString);
      list = List<ProductOfDeliveryRequest>.from(
          jsonList.map((e) => ProductOfDeliveryRequest.fromJson(e)));
    }
    list.toString();
    return list;
  }

  static bool addProductOfDeliveryList({
    required String? taskDeliverAppID,
    required String imei,
    required List<ProductOfDeliveryRequest> listProductOfDeliveryRequest,
  }) {
    if (!listProductOfDeliveryRequest.any((element) => element.imei == imei)) {
      listProductOfDeliveryRequest.add(ProductOfDeliveryRequest(
          imei: imei, taskDeliverAppID: taskDeliverAppID));
      for (int i = 0; i < listProductOfDeliveryRequest.length; i++) {
        listProductOfDeliveryRequest[i].sttSanPham = i + 1;
        saveProductOfDeliveryList(
            listProductOfDeliveryRequest: listProductOfDeliveryRequest,
            taskDeliverAppID: taskDeliverAppID);
      }
      return true;
    }
    return false;
  }

  static void saveProductOfDeliveryList({
    required String? taskDeliverAppID,
    required List<ProductOfDeliveryRequest> listProductOfDeliveryRequest,
  }) {
    final jsonList =
        listProductOfDeliveryRequest.map((e) => e.toJson()).toList();
    final jsonString = jsonEncode(jsonList);
    prefs.setString('$taskDeliverAppID', jsonString);
  }

  static void deleteProductOfDeliveryList({required int? taskDeliverAppID}) {
    prefs.remove(taskDeliverAppID!.toString());
  }

  static void clearStorage() {
    prefs.clear();
  }
}
