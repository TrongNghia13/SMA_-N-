import 'dart:convert';

import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/models/TaskDeliverDetailModel.dart';
class UploadTaskRequestModel{
  final TaskDeliverAppModel taskDeliverAppModel;
  final List<TaskDeliverDetailModel> listTaskDeliverDetailModel;
  UploadTaskRequestModel({
    required this.taskDeliverAppModel,
    required this.listTaskDeliverDetailModel
  });
  Map<String, dynamic> toJson() {
    return {
      'taskDeliverAppModel': taskDeliverAppModel.toJson(),
      'listTaskDeliverDetailModel': listTaskDeliverDetailModel.map((e) => e.toJson()).toList(),
    };
  }

  String modelToJsonEncode(){
    return jsonEncode(toJson());
  }

  factory UploadTaskRequestModel.fromJson(Map<String, dynamic> json) {
    return UploadTaskRequestModel(
        taskDeliverAppModel: json['taskDeliverAppModel'],
        listTaskDeliverDetailModel: json['listTaskDeliverDetailModel'],
    );
  }
  @override
  String toString() {
    // TODO: implement toString
    return 'taskDeliverAppModel: $taskDeliverAppModel, listTaskDeliverDetailModel: $listTaskDeliverDetailModel';
  }
}