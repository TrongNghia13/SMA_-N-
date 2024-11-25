import 'dart:convert';

class ProductImeiModel {
  final int productImeiID;
  final int? receiptImeiID;
  final String? workProcessID;
  final String? imei;
  final String? productID;
  final int? quantity;
  final String? standard;
  final String? productionBatchNo;
  final String? galvanizedOrganization;
  final String? steelPrice;
  final String? vendor;
  final String? steelType;
  final String? width;
  final String? thickness;
  final double? weight1;
  final double? weight2;
  final double? weight3;
  final String? specification;
  String? note;
  String? image1;
  String? image2;
  String? image3;
  String? image4;
  final int? parentID;
  String? createdBy;
  final String? createdDate;

  ProductImeiModel({
    required this.productImeiID,
    this.receiptImeiID,
    this.workProcessID,
    this.imei,
    this.productID,
    this.quantity,
    this.standard,
    this.productionBatchNo,
    this.galvanizedOrganization,
    this.steelPrice,
    this.vendor,
    this.steelType,
    this.width,
    this.thickness,
    this.weight1,
    this.weight2,
    this.weight3,
    this.specification,
    this.note,
    this.image1,
    this.image2,
    this.image3,
    this.image4,
    this.parentID,
    this.createdBy,
    this.createdDate,
  });

  Map<String, dynamic> toJson() {
    return {
      'productImeiID': productImeiID,
      'receiptImeiID': receiptImeiID,
      'workProcessID': workProcessID,
      'imei': imei,
      'productID': productID,
      'quantity': quantity,
      'standard': standard,
      'productionBatchNo': productionBatchNo,
      'galvanizedOrganization': galvanizedOrganization,
      'steelPrice': steelPrice,
      'vendor': vendor,
      'steelType': steelType,
      'width': width,
      'thickness': thickness,
      'weight1': weight1,
      'weight2': weight2,
      'weight3': weight3,
      'specification': specification,
      'note': note,
      'image1': image1,
      'image2': image2,
      'image3': image3,
      'image4': image4,
      'parentID': parentID,
      'createdBy': createdBy,
      'createdDate': createdDate,
    };
  }

  factory ProductImeiModel.fromJson(Map<String, dynamic> json) {
    return ProductImeiModel(
        productImeiID: json['productImeiID'],
        receiptImeiID: json['receiptImeiID'],
        workProcessID: json['workProcessID'],
        imei: json['imei'],
        productID: json['productID'],
        quantity: json['quantity'],
        standard: json['standard'],
        productionBatchNo: json['productionBatchNo'],
        galvanizedOrganization: json['galvanizedOrganization'],
        steelPrice: json['steelPrice'],
        vendor: json['vendor'],
        steelType: json['steelType'],
        width: json['width'],
        thickness: json['thickness'],
        weight1: json['weight1'],
        weight2: json['weight2'],
        weight3: json['weight3'],
        specification: json['specification'],
        note: json['note'],
        image1: json['image1'],
        image2: json['image2'],
        image3: json['image3'],
        image4: json['image4'],
        parentID: json['parentID'],
        createdBy: json['createdBy'],
        createdDate: json['createdDate']);
  }
  String modelToJsonEncode(){
    return jsonEncode(toJson());
  }
  @override
  String toString() {
    // TODO: implement toString
    return "productImeiID: $productImeiID, receiptImeiID:$receiptImeiID,workProcessID: $workProcessID,\n"
        "imei:$imei,productID:$productID,'quantity':$quantity,standard':$standard,\n"
        "'productionBatchNo':$productionBatchNo,'galvanizedOrganization':$galvanizedOrganization,\n"
        "'steelPrice':$steelPrice,'vendor':$vendor,\n"
        "'steelType':$steelType,'width':$width,'thickness':$thickness,\n"
        "'weight1':$weight1,weight2':$weight2,'weight3':$weight3,\n"
        "'specification':$specification,'note':$note,\n"
        "'image1':$image1,'image2':$image2,'image3':$image3,'image4':$image4,\n"
        "'parentID':$parentID,'createdBy':$createdBy,'createdDate':$createdDate\n";
  }
}
