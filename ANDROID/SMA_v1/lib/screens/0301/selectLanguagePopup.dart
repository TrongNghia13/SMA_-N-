import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/components/smaColors.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/models/languageModel.dart';
import 'package:sma/main.dart';
import 'package:sma/components/sharedPreferences/languageSharedPreferences.dart';

class selectLanguagePopup {
  static void selectLanguageDialog(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          String? selectedValue;
          return AlertDialog(
            // backgroundColor: Colors.white,
            title: Text(
              AppLocalizations.of(context).changeLanguage,
              style:
                  TextStyle(color: smaColors.blue, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            content: SizedBox(
              height: 150,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  DropdownButtonFormField2<String>(
                    isExpanded: true,
                    decoration: InputDecoration(
                      // Add Horizontal padding using menuItemStyleData.padding so it matches
                      // the menu padding when button's width is not specified.
                      contentPadding: const EdgeInsets.symmetric(vertical: 16),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                      // Add more decoration..
                    ),
                    hint: Text(
                      languageModel.mapCodeToName(LANGUAGENOWINFORMATION) ??
                          'Select your language',
                      style: TextStyle(fontSize: 14),
                    ),
                    items: languageModel
                        .languageList()
                        .map((item) => DropdownMenuItem<String>(
                              value: item.languageCode,
                              child: Text(
                                " ${item.name} ${item.flag}",
                                style: const TextStyle(
                                  fontSize: 14,
                                ),
                              ),
                            ))
                        .toList(),
                    // validator: (value) {
                    //   if (value == null) {
                    //     return 'Please select language.';
                    //   }
                    //   return null;
                    // },
                    onChanged: (value) {
                      //Do something when selected item is changed.
                      selectedValue = value.toString();
                    },
                    onSaved: (value) {
                      selectedValue = value.toString();
                    },
                    buttonStyleData: const ButtonStyleData(
                      padding: EdgeInsets.only(right: 8),
                    ),
                    iconStyleData: const IconStyleData(
                      icon: Icon(
                        Icons.arrow_drop_down,
                        color: Colors.black45,
                      ),
                      iconSize: 24,
                    ),
                    dropdownStyleData: DropdownStyleData(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(15),
                      ),
                    ),
                    menuItemStyleData: const MenuItemStyleData(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                    ),
                  ),
                ],
              ),
            ),
            actions: [
              ElevatedButton(
                onPressed: () async {
                  // Xử lý logic khi người dùng xác nhận
                  // ...
                  if (selectedValue != null) {
                    Locale _locale = await setLocaleSP(selectedValue!);
                    SMAApplication.setLocale(context, _locale);
                    setLanguageNowInformation();
                  }
                  // Đóng hộp thoại và thoát khỏi màn hình
                  Navigator.of(context).pop();
                },
                style: ElevatedButton.styleFrom(
                  primary: Colors.green,
                  onPrimary: Colors.white,
                ),
                child: Text(AppLocalizations.of(context).save),
              ),
              ElevatedButton(
                onPressed: () {
                  // Xử lý logic khi người dùng xác nhận
                  // ...
                  // Đóng hộp thoại và thoát khỏi màn hình
                  Navigator.of(context).pop();
                },
                style: ElevatedButton.styleFrom(
                  primary: Colors.red,
                  onPrimary: Colors.white,
                ),
                child: Text(AppLocalizations.of(context).cancel),
              ),
            ],
          );
        });
  }
}
