import 'dart:convert';

class organizationUnitModel {
  final int organizationUnitID;
  final String? organizationUnitName;

  organizationUnitModel(
      {
        required this.organizationUnitID, this.organizationUnitName,
      });

  Map<String, dynamic> toJson() {
    return {
      'organizationUnitID':organizationUnitID,
      'organizationUnitName':organizationUnitName,
    };
  }

  String modelToJsonEncode(){
    return jsonEncode(toJson());
  }

  factory organizationUnitModel.fromJson(Map<String, dynamic> json) {
    return organizationUnitModel(
      organizationUnitID : json ['organizationUnitID'],
      organizationUnitName : json ['organizationUnitName'],
    );
  }
  @override
  String toString() {
    // TODO: implement toString
    return 'organizationUnitID: $organizationUnitID, organizationUnitName: $organizationUnitName';
  }
}
