import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
class TaskDeliverAppRepository {
  Future<List<TaskDeliverAppModel>> getListTaskDeliverAppByUsername({required String username,required bool isRoll}) async {
    try {
      var userValue = userLoginModelSP;
      String uriLink = '';
      if(isRoll){
        uriLink = 'https://apisma.cuahangkinhdoanh.com/api/TaskDeliverApp/GetListByUsername/$username&${userValue.BranchId}&C';
      } else{
        uriLink ='https://apisma.cuahangkinhdoanh.com/api/TaskDeliverApp/GetListByUsername/$username&${userValue.BranchId}&B';
      }
      final response = await http.get(
        Uri.parse(uriLink),
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        final List<TaskDeliverAppModel> taskDeliverAppModelList;
        if(data !=null) {
          taskDeliverAppModelList = data.map((e) => TaskDeliverAppModel.fromJson(e)).toList();
        }else {
          taskDeliverAppModelList =[];
        }
        return taskDeliverAppModelList;
      } else {
        return [];
      }
    } catch (error) {
      print('Error $error');
      throw Exception('Error $error');
    }
  }
}








