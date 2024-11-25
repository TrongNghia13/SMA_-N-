import 'package:flutter/foundation.dart';

class StringDefectModel extends ChangeNotifier {
  String _stringDefect = '';

  String get stringDefect => _stringDefect;

  void updateData(String newData) {
    _stringDefect = newData;
    notifyListeners();
  }
}