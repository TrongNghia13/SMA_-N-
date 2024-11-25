import 'package:flutter/material.dart';

class TaskDeliverAppModel {
  final int taskDeliverAppID; // khoá chính
  final String? receiptNo;
  final String? taskDate;
  final String? userName;
  final String productionPlanID;
  final String? storeID;
  final String? materialType;
  final String? vendor;
  final String? width;
  final String? thickness;
  final String? productionBatchNo;
  final int? quantity;
  final bool? isFinish;
  final String? createBy;
  final String? createdDate;

  TaskDeliverAppModel(
      {required this.taskDeliverAppID,
       this.taskDate,
       this.userName, this.receiptNo,
        required this.productionPlanID,
       this.storeID,
       this.materialType,
       this.vendor,
       this.width,
       this.thickness,
       this.productionBatchNo,
       this.quantity,
       this.isFinish,
       this.createBy,
       this.createdDate});

  Map<String, dynamic> toJson() {
    return {
      'taskDeliverAppID': taskDeliverAppID,
      'receiptNo':receiptNo,
      'taskDate': taskDate,
      'userName': userName,
      'productionPlanID': productionPlanID,
      'storeID': storeID,
      'materialType': materialType,
      'vendor': vendor,
      'width': width,
      'thickness': thickness,
      'productionBatchNo': productionBatchNo,
      'quantity': quantity,
      'isFinish': isFinish,
      'createBy': createBy,
      'createdDate': createdDate,
    };
  }

  factory TaskDeliverAppModel.fromJson(Map<String, dynamic> json) {
    return TaskDeliverAppModel(
      taskDeliverAppID: json['taskDeliverAppID'],
      receiptNo: json['receiptNo'],
      taskDate: json['taskDate'],
      userName: json['userName'],
      productionPlanID: json['productionPlanID'],
      storeID: json['storeID'],
      materialType: json['materialType'],
      vendor: json['vendor'],
      width: json['width'],
      thickness: json['thickness'],
      productionBatchNo: json['productionBatchNo'],
      quantity: json['quantity'],
      isFinish: json['isFinish'],
      createBy: json['createBy'],
      createdDate: json['createdDate'],

    );
  }

  @override
  String toString() {
    // TODO: implement toString
    return 'taskDeliverAppID: $taskDeliverAppID, taskDate: $taskDate,userName: $userName, productionPlanID: $productionPlanID,storeID: $storeID \n'
        'materialType : $materialType,vendor: $vendor, productionBatchNo: $productionBatchNo\n'
        'width: $width, thickness:$thickness, quantity: $quantity'
        'createBy: $createBy, createdDate: $createdDate'
        'isFinish $isFinish';
  }
}
