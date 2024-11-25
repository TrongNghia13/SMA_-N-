import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:sma/components/sharedPreferences/notificationSharedPreference.dart';
Future<void> handleBackGroundMessage(RemoteMessage message) async{
  print('Title: ${message.notification?.title}');
  print('body: ${message.notification?.body}');
  getListNotificationModel();
  addNotificationModel(message.notification?.title ?? "",message.notification?.body??"");
}
class FirebaseNotificationRepository {
  final _firebaseMessaging = FirebaseMessaging.instance;
  Future<void> initNotification() async{
    await  _firebaseMessaging.requestPermission();
    final fCMToken = await _firebaseMessaging.getToken();
    FirebaseMessaging.onBackgroundMessage(handleBackGroundMessage);
  }
}