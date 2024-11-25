import 'package:flutter/material.dart';

import 'package:sma/components/widgets/MessageFunctionBuidingWidget.dart';

class Phone extends StatefulWidget {
  @override
  _PhoneState createState() => _PhoneState();
}

class _PhoneState extends State<Phone> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: MessageFunctionBuidingWidget(context),
      ),
    );
  }
}