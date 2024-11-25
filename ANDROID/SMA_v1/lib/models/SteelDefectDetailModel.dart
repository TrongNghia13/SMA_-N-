import 'CateSteelDefectModel.dart';

class SteelDefectDetailModel {
  late int? steelDefectDetailID;
  final String imei;
  final int main;
  late  int option1;
  late  int option2;
  late  int option3;
  late  int option4;
  late  String? steelDefectName;
  late  String? createdBy;
  late  String? createdDate;

  SteelDefectDetailModel(
      {required this.steelDefectDetailID,
        required this.imei,
        required this.main,
        required this.option1,
        required this.option2,
        required this.option3,
        required this.option4,
        required this.steelDefectName,
        required this.createdBy,
        required this.createdDate});

  Map<String, dynamic> toJson() {
    return {
      'steelDefectDetailID': steelDefectDetailID,
      'imei': imei,
      'main': main,
      'option1': option1,
      'option2': option2,
      'option3': option3,
      'option4': option4,
      'steelDefectName': steelDefectName,
      'createdBy': createdBy,
      'createdDate': createdDate
    };
  }

  factory SteelDefectDetailModel.fromJson(Map<String, dynamic> json) {
    return SteelDefectDetailModel(
        steelDefectDetailID: json['steelDefectDetailID'],
        imei: json['imei'],
        main: json['main'],
        option1: json['option1'],
        option2: json['option2'],
        option3: json['option3'],
        option4: json['option4'],
        steelDefectName: json['steelDefectName'],
        createdBy: json['createdBy'],
        createdDate: json['createdDate']);
  }
  String transToString({ required List<CateSteelDefectModel> bList}) {
    String result = '';
    Map<String, int> defectTypes = {
      'main': main,
      'option1': option1,
      'option2': option2,
      'option3': option3,
      'option4': option4,
    };

    for (var entry in defectTypes.entries) {
      if (entry.value != 0) {
        String defectType = entry.key;
        int steelDefectId = entry.value;
        if(defectType == 'main'){
          result += 'Lỗi:';
        }
        String defectName = getDefectNameById(id:steelDefectId,bList: bList);
        if(defectName.trim().isNotEmpty && defectType !='main'){
          result += '->$defectName ';
        } else {
          result += '$defectName';
        }
      }
    }
    result +='\n';
    return result;
  }
  String transToStringNormal({ required List<CateSteelDefectModel> bList}) {
    String result = '';
    Map<String, int> defectTypes = {
      'main': main,
      'option1': option1,
      'option2': option2,
      'option3': option3,
      'option4': option4,
    };

    for (var entry in defectTypes.entries) {
      if (entry.value != 0) {
        int steelDefectId = entry.value;
        String defectName = getDefectNameById(id:steelDefectId,bList: bList);
          result += '$defectName ';
      }
    }
    result = '${result.trim()},';
    return result;
  }

  // Helper function to get defect name by ID from the list of B objects
  String getDefectNameById({required int id, required List<CateSteelDefectModel> bList} ) {
    // Replace this with your list of B objects (List<B> bList)

    CateSteelDefectModel? defect = bList.firstWhere((b) => b.steelDefectId == id, orElse: () => CateSteelDefectModel());
    return defect.defectName ?? '';
  }

  @override
  String toString() {
    // TODO: implement toString
    return 'steelDefectDetailID: $steelDefectDetailID, '
        'imei: $imei, '
        'main: $main, '
        'option1: $option1, '
        'option2: $option2, '
        'option3: $option3, '
        'option4: $option4, '
        'steelDefectName: $steelDefectName, '
        'createdBy: $createdBy,'
        'createdDate: $createdDate \n';
  }
}
