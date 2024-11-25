import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:sma/components/sharedPreferences/languageSharedPreferences.dart';
import 'package:sma/screens/0102/screen0102.dart';
import 'package:sma/screens/0201/Screen0201.dart';
import 'package:sma/screens/0301/screen0301.dart';
import 'package:sma/screens/0402/Screen0402.dart';
import 'package:sma/screens/0501/Screen0501.dart';
import 'package:sma/screens/0601/Screen0601.dart';
import 'theme/smaTheme.dart';
import 'screens/0401/Screen0401.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/screens/0403/Screen0403.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/widgets/qrscanner/QRSearchImeiScanner.dart';
import 'package:sma/screens/0701/Screen0701.dart';
import 'package:sma/screens/0801/Screen0801.dart';
import 'package:sma/screens/NagivationBar0103/NavigationBarWidget.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:sma/components/apiController/FirebaseNotificationRepository.dart';
import 'package:sma/components/sharedPreferences/notificationSharedPreference.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await FirebaseNotificationRepository().initNotification();
  runApp(SMAApplication());
}

class SMAApplication extends StatefulWidget {
  const SMAApplication({Key? key}) : super(key: key);
  @override
  State<SMAApplication> createState() => _SMAApplicationState();

  static void setLocale(BuildContext context, Locale newLocale) {
    _SMAApplicationState? sate =
        context.findAncestorStateOfType<_SMAApplicationState>();
    sate?.setLocale(newLocale);
  }
}

class _SMAApplicationState extends State<SMAApplication> {
  Locale? _locale;
  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }
  Future<void> myBackgroundMessageHandler(Map<String, dynamic> message) async {
    if (message.containsKey('data')) {
      final dynamic data = message['data'];
    }

    if (message.containsKey('notification')) {
      final dynamic notification = message['notification'];
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    getListNotificationModel();
    super.initState();
  }
  @override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    getLocaleSP().then((value) => setLocale(value));
    setLanguageNowInformation();
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    _firebaseMessaging.subscribeToTopic('all'); // Subscribe to a topic (optional)
    return MaterialApp(
      title: "SMA Mobile Application",
      theme: smaTheme.lightTheme(context),
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      // this is root
      routes: {
        pageRoutes.homePage0201: (context) => const Screen0201(),
        pageRoutes.deliveryRequestRequestDetail0402: (context) => Screen0402(),
        pageRoutes.qrScan0403: (context) => Screen0403(),
        pageRoutes.checkDeliveryRequest0401: (context) => Screen0401(),
        pageRoutes.navigationBar: (context) => NavigationBarWidget(),
        // pageRoutes.Phone: (context) => Phone(),
        // pageRoutes.settingPage0301: (context) => Bell(),
        pageRoutes.notification: (context) => const screen0301(),
        pageRoutes.captureRollDefect0501:(context) => Screen0501(),
        pageRoutes.qrSearchImeiScanner:(context) => QRSearchImeiScanner(),
        pageRoutes.loginPage0102:(context) => const Screen0102(),
        pageRoutes.lookUp0601:(context) => const Screen0601(),
        pageRoutes.statistical0701:(context) => const Screen0701(),
        pageRoutes.phone0801: (context) => const Screen0801()
      },
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      locale: _locale,
      supportedLocales: const [Locale('vi'), Locale('en')],
      home: const Screen0102(),
    );
  }
}
