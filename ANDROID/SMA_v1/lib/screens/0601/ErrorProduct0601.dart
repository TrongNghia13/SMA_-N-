import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ErrorProduct extends StatelessWidget {
  final List<SteelDefectDetailModel> SteelDefectDetail;
  final List<ProductImeiModel> productImeiList;
  final String? steelDefectName;
  final String? note;

  const ErrorProduct({required this.SteelDefectDetail, required this.productImeiList, this.steelDefectName, this.note});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                AppLocalizations.of(context).errorParameters,
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 5),
              Text(
                AppLocalizations.of(context).detailedDescription,
                style: TextStyle(fontSize: 16, color: smaColors.blueBox2),
              ),
              SizedBox(height: 10),
              Center(
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      children: [
                        if (steelDefectName == null || steelDefectName!.isEmpty)
                          Text(
                            AppLocalizations.of(context).noData,
                            style: TextStyle(fontSize: 16, color: Colors.red),
                          )
                        else
                          Flexible(
                            child: RichText(
                              text: TextSpan(
                                style: TextStyle(fontSize: 14, color: Colors.black),
                                children: _generateTextSpans(steelDefectName!),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              ),
              SizedBox(height: 5),
              Text(
                AppLocalizations.of(context).noteProduct,
                style: TextStyle(fontSize: 16, color: smaColors.blueBox2),
              ),
              SizedBox(height: 10),
              Container(
                decoration: BoxDecoration(
                  color: Colors.grey,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Padding(
                  padding: EdgeInsets.all(10),
                  child: Row(
                    children: [
                      if (note == null || note!.isEmpty)
                        Text(
                          AppLocalizations.of(context).noData,
                          style: TextStyle(fontSize: 16, color: Colors.red),
                        )
                      else
                        Text(
                          note!,
                          style: TextStyle(fontSize: 14, color: Colors.black),
                        ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 10),
            ],
          ),
        ),
      )
    );
  }
}

List<TextSpan> _generateTextSpans(String text) {
  List<String> parts = text.split(', ');
  List<TextSpan> textSpans = [];
  for (String part in parts) {
    if (textSpans.isNotEmpty) {
      textSpans.add(TextSpan(text: '\n')); // Add a new line before each part
    }
    textSpans.add(TextSpan(text: part));
  }
  return textSpans;
}
