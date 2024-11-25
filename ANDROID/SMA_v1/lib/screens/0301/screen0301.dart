import 'package:flutter/material.dart';
import 'appBar0301.dart';
import 'avatar0301.dart';
import 'button0301.dart';
class screen0301 extends StatefulWidget {
  const screen0301({Key? key}) : super(key: key);

  @override
  State<screen0301> createState() => _screen0301State();
}

class _screen0301State extends State<screen0301> {

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
        appBar: AppBar0301(),
        body: const Column(
            children: [
              Expanded(
                flex: 3,
                child: Avatar0301(),
              ),
              Expanded(
                flex: 7,
                child: Button0301(),
              ),
            ],
          ),
    );
  }
}
