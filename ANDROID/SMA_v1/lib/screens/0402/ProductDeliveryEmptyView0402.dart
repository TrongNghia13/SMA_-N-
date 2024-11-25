import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class ProductDeliveryEmptyView0402 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
        children: [
          Container(
            margin: const EdgeInsets.only(top:20),
              width: 300,
                child: Text(
                  AppLocalizations.of(context).currentlyNoProductsHaveBeenAdded,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
              ),
          Container(
            margin: const EdgeInsets.all(40),
            width: 200,
            height: 200,
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(40),
                color: smaColors.blueBox),
            child: const Icon(Icons.clear,
            size: 100,
            color: Colors.white,),
          ),
           SizedBox(
            width: 300,
              child: Text(AppLocalizations.of(context).pleaseTapTheQRIconToAdd,
                textAlign: TextAlign.center,
                style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20
              ),),
          )
        ],
      );
  }
}
