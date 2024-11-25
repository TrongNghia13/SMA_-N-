import 'package:equatable/equatable.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';

abstract class ProductImeiEvent extends Equatable {
  const ProductImeiEvent();

  @override
  List<Object> get props => [];
}

class imeiRequested extends ProductImeiEvent {
  final String imei;
  final bool? isRoll;
  const imeiRequested({required this.imei, required this.isRoll});

  // @override
  // List<Object> get props => [imei,isRoll];
  @override
  Object get prop => [imei,isRoll];
}

class productImeiUpdateRequest extends ProductImeiEvent {
  final ProductImeiModel productImeiModel;
  final List<SteelDefectDetailModel> listSteelDefectDetailModel;
  final List<XFile> listXFile;
  final bool isChange;
  const productImeiUpdateRequest({required this.productImeiModel, required this.listSteelDefectDetailModel, required this.listXFile, required this.isChange});

  // @override
  // List<Object> get props => [imei,isRoll];
  @override
  Object get prop => [productImeiModel, listSteelDefectDetailModel, listXFile, isChange];

}

class cateDefectHandle extends ProductImeiEvent {
  const cateDefectHandle();
}
class imeiRequestStarted extends ProductImeiEvent {}
