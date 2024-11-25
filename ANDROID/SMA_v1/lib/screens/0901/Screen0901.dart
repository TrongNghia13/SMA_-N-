import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sma/screens/0901/AppBar0901.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/sharedPreferences/notificationSharedPreference.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';

import '../../models/NotificationModel.dart';

class Screen0901 extends StatefulWidget {
  const Screen0901({Key? key}) : super(key: key);

  @override
  State<Screen0901> createState() => _Screen0901State();
}

class _Screen0901State extends State<Screen0901> {

  late Timer _timer;
  List<NotificationModel> notificationList =[];
  @override
  void initState() {
    _timer = Timer.periodic(const Duration(seconds: 10), (timer) {
      // Lệnh bạn muốn thực hiện sau mỗi khoảng thời gian
      _autoRefresh();
    });
    notificationList = listNotificationModel.where((element) => element.username == userLoginModelSP.UserName).toList();
    // TODO: implement initState
    super.initState();
  }
  @override
  void dispose() {
    // Hủy bỏ lịch trình khi widget bị dispose để tránh memory leak
    _timer.cancel();
    super.dispose();
  }
  Future<void> _refreshDataOnPull() async {
    // Simulate fetching new data or refreshing existing data.
    await Future.delayed(const Duration(seconds: 1));
    setState(() {
      notificationList = listNotificationModel.where((element) => element.username == userLoginModelSP.UserName).toList();
    });
  }
  void _autoRefresh(){
    setState(() {
      notificationList = listNotificationModel.where((element) => element.username == userLoginModelSP.UserName).toList();
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar0901(
      ),
      body: RefreshIndicator(
        onRefresh: _refreshDataOnPull,
        child: (notificationList.isEmpty)
            ? SizedBox(
          height: double.infinity,
          width: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children:[
              Icon(
                Icons.notifications_off,
                color: Colors.grey,
                size: 100.0,
              ),
              SizedBox(height: 10.0),
              Text(
                AppLocalizations.of(context).errNotification,
                style: TextStyle(
                  color: Colors.grey,
                  fontSize: 18.0,
                ),
              )
            ],
          ),
        )
            : ListView.builder(
          itemCount: notificationList.length,
          itemBuilder: (context, index) {
            final item = notificationList[index];
            return Padding(
              padding: (index == 0)
                  ? const EdgeInsets.symmetric(vertical: 8.0)
                  : const EdgeInsets.only(bottom: 10.0),
              child: Dismissible(
                key: Key('$item'),
                background: Container(
                  color: Colors.red,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20.0),
                        child: Icon(
                          Icons.delete,
                          color: Colors.white,
                          size: 30.0,
                        ),
                      ),
                    ],
                  ),
                ),
                onDismissed: (direction) {
                  setState(() {
                    notificationList.removeAt(index);
                    removeNotification(item);
                  });
                },
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 10.0),
                  padding: const EdgeInsets.all(8.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: smaColors.grey,
                        spreadRadius: 4,
                        blurRadius: 2,
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 40.0,
                        height: 40.0,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10.0),
                          color: Colors.indigo[400],
                        ),
                        child: const Icon(Icons.notifications,
                          size: 20.0,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(width: 7.0),
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item.title!,
                              style: TextStyle(
                                fontSize: 14.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              item.body!,
                              style: TextStyle(
                                fontSize: 14.0,
                                color: Colors.grey[600],
                              ),
                            ),
                            Text(
                              item.date.toString().substring(0,19)!,
                              style: TextStyle(
                                fontSize: 12.0,
                                color: smaColors.blueBox,
                              ),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      )

    );
  }
}