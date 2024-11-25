import 'dart:convert';

class jobTitleModel {
  final int jobTitleID;
  final String? jobTitleName;

  jobTitleModel(
      {
        required this.jobTitleID, this.jobTitleName,
      });

  Map<String, dynamic> toJson() {
    return {
      'jobTitleID':jobTitleID,
      'jobTitleName':jobTitleName,
    };
  }

  String modelToJsonEncode(){
    return jsonEncode(toJson());
  }

  factory jobTitleModel.fromJson(Map<String, dynamic> json) {
    return jobTitleModel(
      jobTitleID : json ['jobTitleID'],
      jobTitleName : json ['jobTitleName'],
    );
  }
  @override
  String toString() {
    // TODO: implement toString
    return 'jobTitleID: $jobTitleID, jobTitleName: $jobTitleName';
  }
}
