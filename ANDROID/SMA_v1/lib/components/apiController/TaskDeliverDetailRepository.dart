import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/ProductOfDeliveryRequest.dart';
import 'package:sma/models/TaskDeliverDetailModel.dart';
import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/models/UploadTaskRequestModel.dart';
class TaskDeliverDetailRepository {
  Future<bool> uploadListTaskDeliverDetail({required TaskDeliverAppModel taskDeliverAppModel,required List<ProductOfDeliveryRequest> productOfDeliveryRequest}) async {
    try {
      String uriLink = 'https://apisma.cuahangkinhdoanh.com/api/TaskDeliverDetail/UploadTaskRequest';
      List<TaskDeliverDetailModel> listTaskDeliverDetailModel = [];
      for(var i = 0;i<productOfDeliveryRequest.length;i++){
        listTaskDeliverDetailModel.add(TaskDeliverDetailModel(imei: productOfDeliveryRequest[i].imei, taskDeliverAppID: productOfDeliveryRequest[i].taskDeliverAppID,createBy: taskDeliverAppModel.createBy));
      }
      UploadTaskRequestModel uploadTaskRequestModel = UploadTaskRequestModel(listTaskDeliverDetailModel: listTaskDeliverDetailModel,taskDeliverAppModel: taskDeliverAppModel);
      print(uploadTaskRequestModel);
      final response = await http.post(
        Uri.parse(uriLink),
        headers: {'Content-Type': 'application/json'},
          body: uploadTaskRequestModel.modelToJsonEncode()
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        print(response.body);
        return false;
      }
    } catch (error) {
      print('Error $error');
      throw Exception('Error $error');
    }
  }
}








