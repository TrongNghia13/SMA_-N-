import 'dart:convert';

class workProcessModel {
  final String workProcessID;
  final String wanufacturingProcessID;
  final String workName;
  final String workDescription;

  workProcessModel({
    required this.workProcessID,
    required this.wanufacturingProcessID,
    required this.workName,
    required this.workDescription,

  });

  Map<String, dynamic> toJson() {
    return {
      'workProcessID': workProcessID,
      'wanufacturingProcessID': wanufacturingProcessID,
      'workName': workName,
      'workDescription': workDescription,
    };
  }

  String modelToJsonEncode() {
    return jsonEncode(toJson());
  }

  factory workProcessModel.fromJson(Map<String, dynamic> json) {
    return workProcessModel(
      workProcessID: json['workProcessID'] ?? '', // Provide a default empty string value if BranchID is null
      wanufacturingProcessID: json['wanufacturingProcessID'] ?? '',
      workName: json['workName'] ?? '',
      workDescription: json['workDescription'] ?? '',// Provide a default empty string value if BranchName is null
    );
  }


  @override
  String toString() {
    return 'workProcessID: $workProcessID, wanufacturingProcessID: $wanufacturingProcessID, workName: $workName, workDescription: $workDescription';
  }
}
