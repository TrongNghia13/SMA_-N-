import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class UsernameField extends StatelessWidget {
  final TextEditingController controller;
  final FocusNode nextFocusNode; // Add this line

  const UsernameField({required this.controller, required this.nextFocusNode}); // Add 'required this.nextFocusNode'

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "${AppLocalizations.of(context).account}",
          style: TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 5),
        TextField(
          controller: controller,
          onEditingComplete: () {
            FocusScope.of(context).requestFocus(nextFocusNode); // Move focus to nextFocusNode
          },
          decoration: InputDecoration(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.0),
              borderSide: BorderSide.none,
            ),
            filled: true,
            fillColor: Colors.white,
            hintText: AppLocalizations.of(context).accountHint,
            contentPadding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
          ),
        ),
        SizedBox(height: 20),
      ],
    );
  }
}
