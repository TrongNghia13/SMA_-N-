import 'dart:convert';

class employeeModel {
  final int employeeID;
  final String? employeeCode;
  final int organizationUnitID;
  final String? fullName;
  final int jobTitleID;
  final String? employeeTel;
  final String? employeeEmail;
  final String? employeeImage;
  final String? description;

  employeeModel(
      { required this.employeeID,
        this.employeeCode,
        required this.organizationUnitID,
        this.fullName,
        required this.jobTitleID,
        this.employeeTel,
        this.employeeEmail,
        this.employeeImage,
        this.description,});

  Map<String, dynamic> toJson() {
    return {
      'employeeID': employeeID,
      'employeeCode' : employeeCode,
      'organizationUnitID': organizationUnitID,
      'fullName':fullName,
      'jobTitleID':jobTitleID,
      'employeeTel':employeeTel,
      'employeeEmail':employeeEmail,
      'employeeImage':employeeImage,
      'description':description,

    };
  }

  String modelToJsonEncode(){
    return jsonEncode(toJson());
  }

  factory employeeModel.fromJson(Map<String, dynamic> json) {
    return employeeModel(
        employeeID: json['employeeID'],
        employeeCode : json ['employeeCode'],
        organizationUnitID : json ['organizationUnitID'],
        fullName : json ['fullName'],
        jobTitleID : json ['jobTitleID'],
        employeeTel : json ['employeeTel'],
        employeeEmail: json ['employeeEmail'],
        employeeImage : json ['employeeImage'],
        description : json ['description'],

    );
  }
  @override
  String toString() {
    // TODO: implement toString
    return 'employeeID: $employeeID, employeeCode: $employeeCode, organizationUnitID: $organizationUnitID, fullName: $fullName, jobTitleID: $jobTitleID, employeeTel: $employeeTel, employeeEmail: $employeeEmail, employeeImage: $employeeImage, description: $description';
  }
}
