import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/localStore.dart';
import 'package:sma/screens/0301/changepassword/DialogChangePassword.dart';
import 'package:sma/screens/0301/informationPersonal/personalInfomation.dart';
import 'package:sma/screens/0301/selectLanguagePopup.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
class Button0301 extends StatefulWidget {
  const Button0301({Key? key}) : super(key: key);

  @override
  State<Button0301> createState() => _Button0301State();
}

class _Button0301State extends State<Button0301> {
   bool isTapped = false;

  @override
  void initState() {
    // TODO: implement initState
    initSharedPreferences();
    super.initState();
  }
  void initSharedPreferences() async {
    localStore.prefs = await SharedPreferences.getInstance();
  }
  @override
  Widget build(BuildContext context) {
    var text = AppLocalizations.of(context);
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        children: [
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                PageRouteBuilder(
                  pageBuilder: (context, animation, secondaryAnimation) {
                    return InformationPer(); // Thay thế bằng tên lớp của trang thông tin
                  },
                  transitionsBuilder: (context, animation, secondaryAnimation, child) {
                    const begin = Offset(1.0, 0.0);
                    const end = Offset.zero;
                    const curve = Curves.easeInOut;
                    var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
                    var offsetAnimation = animation.drive(tween);
                    return SlideTransition(
                      position: offsetAnimation,
                      child: child,
                    );
                  },
                ),
              );
            },
            child: Container(
              height: 53, // Kích thước mới
              width: 336, // Kích thước mới
              margin: const EdgeInsets.only(left: 25, right: 25, top: 10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(13),
                color: smaColors.grey,
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 25,top: 5),
                child: Row(
                  children: [
                    const Icon(
                      Icons.account_box_rounded,
                      size: 27,
                      color: Colors.black,
                    ),
                    Container(
                      margin: const EdgeInsets.only(left: 15, top: 13),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            AppLocalizations.of(context).personalInfomation,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          // GestureDetector(
          //   onTap: () {
          //     /* Navigator.push(
          //       context,
          //       MaterialPageRoute(
          //         builder: (context) => OtherScreen(),
          //       ),
          //     );*/
          //   },
          //   child: Container(
          //     height: 53, // Kích thước mới
          //     width: 336, // Kích thước mới
          //     margin: EdgeInsets.only(left: 25, right: 25, top: 10),
          //     decoration: BoxDecoration(
          //       borderRadius: BorderRadius.circular(13),
          //       color: smaColors.grey,
          //     ),
          //     child: Padding(
          //       padding: const EdgeInsets.only(left: 25,top: 5),
          //       child: Row(
          //         children: [
          //           Container(
          //             child: Icon(
          //               Icons.people_alt_rounded,
          //               size: 27,
          //               color: Colors.black,
          //             ),
          //           ),
          //           SizedBox(width: 10),
          //           Container(
          //             margin: EdgeInsets.only(left: 15, top: 13),
          //             child: Column(
          //               crossAxisAlignment: CrossAxisAlignment.start,
          //               children: [
          //                 Text(
          //                   'Thông tin người thân',
          //                   style: TextStyle(
          //                     fontSize: 16,
          //                     fontWeight: FontWeight.bold,
          //                     color: Colors.black,
          //                   ),
          //                 ),
          //               ],
          //             ),
          //           ),
          //         ],
          //       ),
          //     ),
          //   ),
          // ),
          GestureDetector(
            onTap: () {
              return DialogChangePassword.showConfirmationDialog(context: context);

            },
            child: Container(
              height: 53, // Kích thước mới
              width: 336, // Kích thước mới
              margin: const EdgeInsets.only(left: 25, right: 25, top: 10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(13),
                color: smaColors.grey,
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 25,top: 5),
                child: Row(
                  children: [
                    Container(
                      child: const Icon(
                        Icons.lock,
                        size: 27,
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(width: 10),
                    Container(
                      margin: EdgeInsets.only(left: 15, top: 13),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            AppLocalizations.of(context).changePassword,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          GestureDetector(
            onTap: () {
              selectLanguagePopup.selectLanguageDialog(context);

            },
            child: Container(
              height: 53, // Kích thước mới
              width: 336, // Kích thước mới
              margin: EdgeInsets.only(left: 25, right: 25, top: 10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(13),
                color: smaColors.grey,
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 25,top: 5),
                child: Row(
                  children: [
                    Container(
                      child: Icon(
                        Icons.language,
                        size: 27,
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(width: 10),
                    Container(
                      margin: EdgeInsets.only(left: 15, top: 13),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            AppLocalizations.of(context).changeLanguage,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          GestureDetector(
            onTapDown: (_) {
              setState(() {
                isTapped = true;
              });
            },
            onTapUp: (_) {
              setState(() {
                isTapped = false;
              });
            },
            onTapCancel: () {
              setState(() {
                isTapped = false;
              });
            },
            onTap: (){
              localStore.clearStorage();
              final snackBar = SnackBar(
                content: Text(AppLocalizations.of(context).clearSharedPreferencesNotification),
                action: SnackBarAction(
                  label: AppLocalizations.of(context).close,
                  onPressed: () {
                    // Mã xử lý khi nhấn nút Đóng
                  },
                ),
              );
              ScaffoldMessenger.of(context).showSnackBar(snackBar);
            },
            child: AnimatedContainer(
              duration: Duration(milliseconds: 200),
              height: 53, // Kích thước mới
              width: 336, // Kích thước mới
              margin: EdgeInsets.only(left: 25, right: 25, top: 10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(13),
                color: isTapped ? Colors.greenAccent : smaColors.grey,
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 25,top: 5),
                child: Row(
                  children: [
                    Container(
                      child: Icon(
                        Icons.clear_all,
                        size: 27,
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(width: 10),
                    Container(
                      margin: EdgeInsets.only(left: 15, top: 13),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            AppLocalizations.of(context).clearCache,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          GestureDetector(
            onTap: () async{
              bool check = await clearLoginUserModelSP();
              if(check){
                Navigator.of(context).popAndPushNamed(
                    pageRoutes.loginPage0102
                );
                final snackBar = SnackBar(
                  content: Text(AppLocalizations.of(context).logoutNotification),
                  action: SnackBarAction(
                    label: AppLocalizations.of(context).close,
                    onPressed: () {
                      // Mã xử lý khi nhấn nút Đóng
                    },
                  ),
                );
                ScaffoldMessenger.of(context).showSnackBar(snackBar);
              } else{
                Navigator.of(context).popAndPushNamed(
                    pageRoutes.loginPage0102
                );
              }
            },
            child: Container(
              height: 53, // Kích thước mới
              width: 336, // Kích thước mới
              margin: EdgeInsets.only(left: 25, right: 25, top: 25),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(13),
                color: smaColors.blueLight,
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 25,top: 5),
                child: Row(
                  children: [
                    Container(
                      child: Icon(
                        Icons.logout,
                        size: 27,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Container(
                      margin: const EdgeInsets.only(left: 15, top: 13),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            AppLocalizations.of(context).logOut,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
