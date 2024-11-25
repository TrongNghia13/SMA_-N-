import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class DeliveryRequestListItemEmptyView0401 extends StatelessWidget {
  const DeliveryRequestListItemEmptyView0401({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
          height: 300,
          margin: const EdgeInsets.only(top: 100),
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40),
              color: smaColors.blueBox),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.work_off,
                size: 100,
                color: Colors.white,
              ),
              Text(
                AppLocalizations.of(context).emptyTaskApp,
                style:
                    const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              ),
              Text(
                AppLocalizations.of(context).noJobNotification,
                style:
                    const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        );
  }
}
