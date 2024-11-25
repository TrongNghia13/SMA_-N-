import 'dart:convert';

class MenuAppModel {
  int? menuAppID;
  String? menuAppName;
  String menuAppKey;
  int? sortOrder;

  MenuAppModel(
      {this.menuAppID, this.menuAppName, required this.menuAppKey, this.sortOrder});

  Map<String, dynamic> toJson() {
    return {
      'menuAppID': menuAppID,
      'menuAppName': menuAppName,
      'menuAppKey': menuAppKey,
      'sortOrder': sortOrder,
    };
  }

  factory MenuAppModel.fromJson(Map<String, dynamic> json) {
    return MenuAppModel(
        menuAppID: json['menuAppID'],
        menuAppName: json['menuAppName'],
        menuAppKey: json['menuAppKey'],
        sortOrder: json['sortOrder']);
  }

  String modelToJsonEncode() {
    return jsonEncode(toJson());
  }

  @override
  String toString() {
    // TODO: implement toString
    return "menuAppID: $menuAppID, menuAppName:$menuAppName,menuAppKey: $menuAppKey,\n"
        "sortOrder:$sortOrder";
  }
}
