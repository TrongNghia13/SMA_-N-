import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class PasswordField extends StatefulWidget {
  final TextEditingController controller;
  final FocusNode focusNode; // Add this line

  const PasswordField({required this.controller, required this.focusNode}); // Add 'required this.focusNode'

  @override
  _PasswordFieldState createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          AppLocalizations.of(context).password,
          style: TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 5),
        TextFormField(
          controller: widget.controller,
          focusNode: widget.focusNode, // Add this line
          onEditingComplete: () {
            widget.focusNode.unfocus(); // Unfocus current field
            // Add any additional logic you want to perform after entering password and pressing Enter
          },
          obscureText: _obscureText,
          decoration: InputDecoration(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10.0),
              borderSide: BorderSide.none,
            ),
            filled: true,
            fillColor: Colors.white,
            hintText: AppLocalizations.of(context).passwordHint,
            contentPadding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
            suffixIcon: IconButton(
              icon: Icon(
                _obscureText ? Icons.visibility : Icons.visibility_off,
                color: Colors.black54,
                size: 20,
              ),
              onPressed: () {
                setState(() {
                  _obscureText = !_obscureText;
                });
              },
            ),
          ),
        ),
        SizedBox(height: 20),
      ],
    );
  }
}
