import 'dart:convert';

class UserLoginModel {
  String UserId;
  String UserName;
  String EmployeeId;
  String EmployeeName;
  String BranchId;
  String BranchName;

  UserLoginModel({
    required this.UserId,
    required this.UserName,
    required this.EmployeeId,
    required this.EmployeeName,
    required this.BranchId,
    required this.BranchName,
  });

  Map<String, dynamic> toJson() {
    return {
      'UserId': UserId,
      'UserName': UserName,
      'EmployeeId': EmployeeId,
      'EmployeeName': EmployeeName,
      'BranchId': BranchId,
      'BranchName': BranchName
    };
  }

  String modelToJsonEncode() {
    return jsonEncode(toJson());
  }

  factory UserLoginModel.fromJson(Map<String, dynamic> json) {
    return UserLoginModel(
      UserId: json['UserId'],
      UserName: json['UserName'],
      EmployeeId: json['EmployeeId'],
      EmployeeName: json['EmployeeName'],
      BranchId: json['BranchId'],
      BranchName: json['BranchName'],
    );
  }

  @override
  String toString() {
    // TODO: implement toString
    return 'userID: $UserId, UserName: $UserName, EmployeeId: $EmployeeId, EmployeeName: $BranchId,BranchId: $EmployeeName,BranchName: $BranchName' ;
  }
}
