import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/MenuAppModel.dart';
class RoleAppRepository {
  Future<List<MenuAppModel>> getListMenuApp({required int userId}) async {
    try {
      final response = await http.get(
        Uri.parse('https://apisma.cuahangkinhdoanh.com/api/UserRole/GetListRoleAppDetailByUserId/$userId'),
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        final List<MenuAppModel> menuAppModelList;
        if(data !=null) {
          menuAppModelList = data.map((e) => MenuAppModel.fromJson(e)).toList();
          menuAppModelList.sort((a, b) => a.sortOrder!.compareTo(b.sortOrder!));
        }else {
          menuAppModelList =[];
        }
        return menuAppModelList;
      } else {
        return [];
      }
    } catch (error) {
      print('Error $error');
      throw Exception('Error $error');
    }
  }
}








