import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class searchBarWidget extends StatelessWidget {
  bool? isEnable;
  Function(String) onSearchChanged; // Callback function
  searchBarWidget({super.key, this.isEnable, required this.onSearchChanged});

  @override
  Widget build(BuildContext context) {
    return Container(
      // Cái khung chứa ô tìm kiếm
      margin: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(14),
        color: smaColors.searchbar,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            margin: const EdgeInsets.only(left: 10),
            child: const Icon(Icons.search),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: TextField(
              enabled: isEnable,
              decoration: InputDecoration(
                hintText: AppLocalizations.of(context).searchViaPlanId,
                border: InputBorder.none,
                hintStyle: const TextStyle(
                  color: Colors.black,
                ),
              ),
              style: const TextStyle(color: Colors.black),
              onChanged: (value) {
                onSearchChanged(value); // Gọi callback function và truyền giá trị tìm kiếm
              },
            ),
          ),
          const SizedBox(width: 10),
        ],
      ),
    );
  }
}

