import 'package:flutter/material.dart';
import 'package:sma/screens/0701/AppBar0701.dart';
import 'package:sma/components/smaColors.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/pageRoutes.dart';
import 'InputTab.dart';
import 'RevenueTab.dart';
import 'OutputTab.dart';
import 'InventoryTab.dart';
class Screen0701 extends StatefulWidget {
  const Screen0701({Key? key}) : super(key: key);

  @override
  State<Screen0701> createState() => _Screen0701State();
}

class _Screen0701State extends State<Screen0701>with SingleTickerProviderStateMixin {
  late TabController tabController;
  @override
  void initState() {
    tabController = TabController(length: 4, vsync: this);
    super.initState();
  }
  @override
  void dispose() {
    tabController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Navigator.of(context).popAndPushNamed(pageRoutes.navigationBar);
        return false;
      },
      child: Scaffold(
        backgroundColor: smaColors.pageBackground,
          appBar: AppBar0701(),
          body:  Column(
            children: [
              TabBar(
                unselectedLabelColor: Colors.teal,
                labelColor: Colors.white,
                indicatorPadding: EdgeInsets.zero,
                indicatorSize: TabBarIndicatorSize.tab,
                automaticIndicatorColorAdjustment: true,
                indicatorColor: Colors.greenAccent,
                dividerColor: Colors.green,
                controller: tabController,
                tabs: [
                  Tab(
                    text: AppLocalizations.of(context).revenue,
                  ),
                  Tab(
                    text: AppLocalizations.of(context).input,
                  ),
                  Tab(
                    text: AppLocalizations.of(context).output,
                  ),
                  Tab(
                    text: AppLocalizations.of(context).inventory,
                  ),
                ],
              ),
              Expanded(
                child: TabBarView(
                  controller: tabController,
                  children: [
                    const SingleChildScrollView(
                      child: Column(
                          children:[
                            RevenueTab(),
                          ]
                      ),
                    ),
                    SizedBox(height: 150,
                        child: InputTab()),
                    OutputTab(),
                    InventoryTab()
                  ],
                ),
              ),
            ],
          ),
          ),
    );
  }
}
