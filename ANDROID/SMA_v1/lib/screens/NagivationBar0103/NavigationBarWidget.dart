import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:line_icons/line_icon.dart';
import 'package:line_icons/line_icons.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/screens/0801/Screen0801.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/screens/0901/Screen0901.dart';
import '../0201/Screen0201.dart';
import '../0301/screen0301.dart';
import 'bell.dart';

class NavigationBarWidget extends StatelessWidget {
   const NavigationBarWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: NavigationApp(),
    );
  }
}

class NavigationApp extends StatefulWidget {
  const NavigationApp({Key? key}) : super(key: key);

  @override
  State<NavigationApp> createState() => _NavigationAppState();
}

class _NavigationAppState extends State<NavigationApp> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
  TextStyle(fontSize: 30, fontWeight: FontWeight.w600);

  final List<Widget> _widgetOptions = <Widget>[
    const Screen0201(),
    const Screen0801(),
    const Screen0901(),
    const screen0301(),
  ];

  void _onTabChange(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _widgetOptions,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: smaColors.blueNavigation,
          boxShadow: [
            BoxShadow(
              blurRadius: 20,
              color: Colors.black.withOpacity(0.1),
            ),
          ],
        ),
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            child: GNav(
              rippleColor: Colors.grey[300]!,
              hoverColor: Colors.grey[100]!,
              gap: 8,
              activeColor: smaColors.blueNavigation,
              iconSize: 28,
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 12),
              tabBackgroundColor: Colors.grey[100]!,
              color: Colors.white,
              tabs: [
                GButton(
                  icon: Icons.home,
                  text: AppLocalizations.of(context).homePage,
                ),
                GButton(
                  icon: Icons.phone_android,
                  text: AppLocalizations.of(context).phone,
                ),
                GButton(
                  icon: Icons.notifications,
                  text: AppLocalizations.of(context).notification,
                ),
                GButton(
                  icon: Icons.settings,
                  text: AppLocalizations.of(context).settings,
                ),
              ],
              selectedIndex: _selectedIndex,
              onTabChange: _onTabChange,
            ),
          ),
        ),
      ),
    );
  }
}