import 'package:sma/models/CateSteelDefectModel.dart';
class optionOfPartenSteelDefectModel {
  final String optionName;
  final int parentId;
  final List<CateSteelDefectModel>? valueList;

  optionOfPartenSteelDefectModel(
      {required this.optionName,
        required this.parentId,
        this.valueList ,});

  @override
  String toString() {
    // TODO: implement toString
    return 'optionName: $optionName, parentId: $parentId,valueList: $valueList';
  }
}
