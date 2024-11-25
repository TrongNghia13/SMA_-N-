import 'dart:convert';

class branchModel {
  final String branchID;
  final String branchName;

  branchModel({
    required this.branchID,
    required this.branchName,
  });

  Map<String, dynamic> toJson() {
    return {
      'branchID': branchID,
      'branchName': branchName,
    };
  }

  String modelToJsonEncode() {
    return jsonEncode(toJson());
  }

  factory branchModel.fromJson(Map<String, dynamic> json) {
    return branchModel(
      branchID: json['branchID'] ?? '', // Provide a default empty string value if BranchID is null
      branchName: json['branchName'] ?? '', // Provide a default empty string value if BranchName is null
    );
  }


  @override
  String toString() {
    return 'branchID: $branchID, branchName: $branchName';
  }
}
