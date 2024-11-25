import 'dart:convert';

class loginModel {
  final String? UserName;
  final String? PassWord;
  final String BranchID;
  final String? NewPassword;

  loginModel(
      { this.UserName,
        this.PassWord,
        required this.BranchID,
      this.NewPassword});

  Map<String, dynamic> toJson() {
    return {
      'userName': UserName,
      'password': PassWord,
      'branchId' : BranchID,
      'newPassword':NewPassword
    };
  }

  String modelToJsonEncode(){
    return jsonEncode(toJson());
  }

  factory loginModel.fromJson(Map<String, dynamic> json) {
    return loginModel(
        UserName: json['userName'],
        PassWord: json['password'],
        BranchID: json['branchId'],
        NewPassword: json['newPassword']

    );
  }
  @override
  String toString() {
    // TODO: implement toString
    return 'UserName: $UserName, PassWord: $PassWord, "BranchID": $BranchID';
  }
}
