class ProductOfDeliveryRequest {
   int? sttSanPham;
   String? taskDeliverAppID;
   String imei;

   ProductOfDeliveryRequest(
      { this.sttSanPham,
       this.taskDeliverAppID,
      required this.imei});

  Map<String, dynamic> toJson() {
    return {
      'sttSanPham': sttSanPham,
      'taskDeliverAppID': taskDeliverAppID,
      'imei' : imei
    };
  }

  factory ProductOfDeliveryRequest.fromJson(Map<String, dynamic> json) {
    return ProductOfDeliveryRequest(
      sttSanPham: json['sttSanPham'],
        taskDeliverAppID: json['taskDeliverAppID'],
        imei: json['imei']
    );
  }

  @override
  String toString() {
    // TODO: implement toString
    return 'sttSanPham: $sttSanPham, imei: $imei';
  }
}
