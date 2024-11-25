import 'package:flutter/material.dart';
import 'package:sma/components/widgets/MessageFunctionBuidingWidget.dart';
class Bell extends StatefulWidget {
  @override
  _BellState createState() => _BellState();
}

class _BellState extends State<Bell> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: MessageFunctionBuidingWidget(context),
      ),
    );
  }
}