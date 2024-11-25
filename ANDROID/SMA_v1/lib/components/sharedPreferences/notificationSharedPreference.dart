import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sma/models/NotificationModel.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';

const String NOTIFICATION_CODE = 'notificationCode';
const String EMPTY = '{}';
UserLoginModel userLoginModel = userLoginModelSP;
List<NotificationModel> listNotificationModel = [];

Future<List<NotificationModel>?> getListNotificationModel() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  List<NotificationModel>? list = [];
  final String? jsonString = _prefs.getString(NOTIFICATION_CODE);
  if (jsonString != null) {
    final jsonList = jsonDecode(jsonString);
    list = List<NotificationModel>.from(
            jsonList.map((e) => NotificationModel.fromJson(e)));
  }
  list.toString();
  listNotificationModel = list;
  return list;
}

Future<void> addNotificationModel(String title, String body) async {
  await getUserLoginSP();
  listNotificationModel.add(NotificationModel(
      body: body, title: title, username: userLoginModel.UserName,date: DateTime.now().toString()));
  await saveNotificationModel();
}

Future<void> saveNotificationModel() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  final jsonList = listNotificationModel.map((e) => e.toJson()).toList();
  final jsonString = jsonEncode(jsonList);
  _prefs.setString(NOTIFICATION_CODE, jsonString);
}

Future<void> removeNotification(NotificationModel notificationModel) async {
  listNotificationModel.remove(notificationModel);
  await saveNotificationModel();
}
