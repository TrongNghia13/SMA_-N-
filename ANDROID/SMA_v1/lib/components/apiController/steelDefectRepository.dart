import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:sma/models/CateSteelDefectModel.dart';
import 'package:sma/models/ProductImeiModel.dart';

class steelDefectRepository {

  Future<List<CateSteelDefectModel>?> getCateSteelDefectByType({required bool isRoll}) async {
    try {
      String uri;
      if (isRoll) {
        uri = 'https://apisma.cuahangkinhdoanh.com/api/CateSteelDefect/GetAllRollDefect';
      } else {
        uri = 'https://apisma.cuahangkinhdoanh.com/api/CateSteelDefect/GetAllTapeDefect';
      }
      final response = await http.get(Uri.parse(uri));
      if (response.statusCode == 200) {
        final List<dynamic> token = jsonDecode(response.body);
        if (token != null) {
          final List<CateSteelDefectModel> csdModelList = token
              .map((data) => CateSteelDefectModel.fromJson(data))
              .toList();
          return csdModelList;
        }
      } else {

        throw Exception('${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Không kết nối đc api + $error');
    }
  }

  Future<List<SteelDefectDetailModel>?> GetListDefectByImei({required String imei}) async {
    try {
      String uri = 'https://apisma.cuahangkinhdoanh.com/api/SteelDefectDetail/GetListDefectByImei/$imei';
      final response = await http.get(Uri.parse(uri));
      if (response.statusCode == 200) {
        final List<dynamic> token = jsonDecode(response.body);
        if (token != null) {
          final List<SteelDefectDetailModel> csdModelList = token
              .map((data) => SteelDefectDetailModel.fromJson(data))
              .toList();
          return csdModelList;
        }
      } else {
        List<SteelDefectDetailModel> csdModelList=[];
        return csdModelList;
      }
    } catch (error) {
      throw Exception('Lỗi GetListDefectByProductImeiId ở steelDefectRepository $error');
    }
  }

}
