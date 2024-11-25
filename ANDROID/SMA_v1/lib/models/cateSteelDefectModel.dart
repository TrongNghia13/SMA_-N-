class CateSteelDefectModel {
  final int? steelDefectId;
  final String? defectName;
  final String? defectType;
  final int? parentId;
  final String? material;

  CateSteelDefectModel(
      {this.steelDefectId,
      this.defectName,
        this.defectType,
      this.parentId,
      this.material});

  Map<String, dynamic> toJson() {
    return {
      'steelDefectID': steelDefectId,
      'defectName': defectName,
      'defectType': defectType,
      'parentID': parentId,
      'material': material,
    };
  }

  factory CateSteelDefectModel.fromJson(Map<String, dynamic> json) {
    return CateSteelDefectModel(
      steelDefectId: json['steelDefectID'],
      defectName: json['defectName'],
      defectType: json['defectType'],
      parentId: json['parentID'],
      material: json['material'],
    );
  }
  @override
  String toString() {
    // TODO: implement toString
    return 'SteelDefectID: $steelDefectId, DefectName: $defectName,DefectType: $defectType, ParentID: $parentId,Material: $material \n';
  }
}
