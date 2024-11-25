import 'dart:convert';

import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
class UploadProductImeiDetailModel{
  final ProductImeiModel productImeiModel;
  final List<SteelDefectDetailModel> listSteelDefectDetailModel;
  UploadProductImeiDetailModel({
    required this.productImeiModel,
    required this.listSteelDefectDetailModel
  });
  Map<String, dynamic> toJson() {
    return {
      'productImeiModel': productImeiModel.toJson(),
      'steelDefectDetailModels': listSteelDefectDetailModel.map((e) => e.toJson()).toList(),
    };
  }

  String modelToJsonEncode(){
    return jsonEncode(toJson());
  }

  factory UploadProductImeiDetailModel.fromJson(Map<String, dynamic> json) {
    return UploadProductImeiDetailModel(
      productImeiModel: json['productImeiModel'],
      listSteelDefectDetailModel: json['steelDefectDetailModels'],
    );
  }
  @override
  String toString() {
    // TODO: implement toString
    return 'productImeiModel: $productImeiModel, listSteelDefectDetailModel: $listSteelDefectDetailModel';
  }
}