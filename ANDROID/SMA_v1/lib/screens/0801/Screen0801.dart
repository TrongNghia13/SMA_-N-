import 'package:flutter/material.dart';
import 'package:sma/screens/0801/AppBar0801.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:url_launcher/url_launcher_string.dart';

class Screen0801 extends StatefulWidget {
  const Screen0801({Key? key}) : super(key: key);

  @override
  State<Screen0801> createState() => _Screen0801State();
}

class _Screen0801State extends State<Screen0801> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar0801(),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              widgetText(AppLocalizations.of(context).titleContact1,
                  AppLocalizations.of(context).contentContact1),
              widgetText(AppLocalizations.of(context).titleContact2,
                  AppLocalizations.of(context).contentContact2),
              widgetText(AppLocalizations.of(context).titleContact3,
                  AppLocalizations.of(context).contentContact3),
              widgetText(AppLocalizations.of(context).titleContact4,
                  AppLocalizations.of(context).contentContact4),
              evelatedButton(AppLocalizations.of(context).titleContact5,
                  " pn3steel@gmail.com",() => _mailTo("pn3steel@gmail.com")),
              evelatedButton(AppLocalizations.of(context).titleContact6,
                  "(0292)3739969",() => _makePhoneCall('02923739969')),
              evelatedButton(AppLocalizations.of(context).titleContact7,
                  "nguyenncce150473@fpt.edu.vn & mailchinguyen@gmail.com",() => _mailTo("mailchinguyen@gmail.com")),
              evelatedButton(AppLocalizations.of(context).titleContact8,
                  "gianghhce140556@fpt.edu.vn",() => _mailTo("gianghhce140556@fpt.edu.vn")),
              widgetText(AppLocalizations.of(context).titleContact9,
                  AppLocalizations.of(context).contentContact9),
            ],
          ),
        ));
  }

  Widget widgetText(String title, String content) {
    return Container(
      margin: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
          ),
          const SizedBox(
            height: 5,
          ),
          Text(content)
        ],
      ),
    );
  }

  Widget evelatedButton(String title, String content, VoidCallback function) {
    return Container(
      margin: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
          ),
          const SizedBox(
            height: 5,
          ),
          ElevatedButton(
              onPressed: function,
              child: Text(content)),
        ],
      ),
    );
  }

  void _launchFacebookURL({required String facebookLink}) async {
    String url =
        'https://www.facebook.com/$facebookLink'; // Thay thế đường link Facebook của bạn vào đây
    if (await canLaunchUrlString(url)) {
      await launchUrlString(url);
    } else {
      print('Không chạy được $url');
    }
  }

  void _makePhoneCall(String phoneNumber) async {
    final url = 'tel:$phoneNumber';
    if (await canLaunchUrlString(url)) {
      await launchUrlString(url);
    } else {
      print('Không kết nối được $phoneNumber');
    }
  }

  void _mailTo(String email) async {
    final url = 'mailto:$email?subject=Title&body=Content';
    if (await canLaunchUrlString(url)) {
      await launchUrlString(url);
    } else {
      print('Không kết nối được $email');
    }
  }
}
