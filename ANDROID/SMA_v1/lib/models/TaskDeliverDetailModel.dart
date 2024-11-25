class TaskDeliverDetailModel {
  int? taskDeliverDetailID;
  String? taskDeliverAppID;
  String imei;
  String? createBy;

  TaskDeliverDetailModel(
      { this.taskDeliverDetailID = 0,
        this.taskDeliverAppID,
        required this.imei,
      this.createBy});

  Map<String, dynamic> toJson() {
    return {
      'taskDeliverDetailID': taskDeliverDetailID,
      'taskDeliverAppID': taskDeliverAppID,
      'imei' : imei,
      'createBy':createBy
    };
  }

  factory TaskDeliverDetailModel.fromJson(Map<String, dynamic> json) {
    return TaskDeliverDetailModel(
        taskDeliverDetailID: json['taskDeliverDetailID'],
        taskDeliverAppID: json['taskDeliverAppID'],
        imei: json['imei'],
        createBy:json['createBy']
    );
  }

  @override
  String toString() {
    // TODO: implement toString
    return 'taskDeliverAppID: $taskDeliverAppID, imei: $imei, createBy: $createBy\n';
  }
}
