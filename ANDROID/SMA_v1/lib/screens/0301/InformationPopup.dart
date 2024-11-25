import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher_string.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class InformationPopup {
  static void showConfirmationDialog({required BuildContext context}) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(AppLocalizations.of(context).informationAboutTheApp),
          content: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: SizedBox(
              height: 200,
              child: Column(
                children: [
                  Text("${AppLocalizations.of(context).createBy}"),
                  informationMember("Lâm Lê Huấn (Mentor)","lamle.huan", "+84913737372"),
                  informationMember("Nguyễn Chí Nguyên","Billy6289", "+84965184725"),
                  informationMember("Huỳnh Hải Giang","profile.php?id=100009013371919", "+84373880067"),
                ],
              ),
            ),
          ),
          actions: <Widget>[
            ElevatedButton(
              child: Text(AppLocalizations.of(context).cancel),
              onPressed: () {
                // Xử lý logic khi người dùng không xác nhận
                // Đóng hộp thoại
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  static Widget informationMember(
      String nameMember, String facebookLink, String phoneNumber) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(nameMember,style: TextStyle(fontWeight: FontWeight.bold,color: Colors.brown)),
        IconButton(
          icon: Icon(Icons.facebook,color: Colors.blue),
          // Thay thế ảnh icon Facebook của bạn vào đây
          onPressed: () {
            _launchFacebookURL(facebookLink: facebookLink);
          },
        ),
        Row(
          children: [
            IconButton(
              icon: Icon(Icons.phone_rounded,color: Colors.green,), // Icon điện thoại
              onPressed:(){
                _makePhoneCall(phoneNumber);
              },
            ),
          ],
        )
      ],
    );
  }

  static void _launchFacebookURL({required String facebookLink}) async {
    String url = 'https://www.facebook.com/$facebookLink'; // Thay thế đường link Facebook của bạn vào đây
    if (await canLaunchUrlString(url)) {
      await launchUrlString(url);
    } else {
      print('Không chạy được $url');
    }
  }
  static void _makePhoneCall(String phoneNumber) async {
    final url = 'tel:$phoneNumber';
    if (await canLaunchUrlString(url)) {
      await launchUrlString(url);
    } else {
      print('Không kết nối được $phoneNumber');
    }
  }

}
