import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/WorkProcessModel.dart';


class WorkProcessRepository {
  Future<List<workProcessModel>> workProcesee() async {
    final response = await http.get(Uri.parse('https://apisma.cuahangkinhdoanh.com/api/WorkProcess/GetALL'));

    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      final List<workProcessModel> work = responseData
          .map((data) => workProcessModel.fromJson(data))
          .toList();
      return work;
    } else {
      throw Exception('Không kết nối API');
    }
  }
}
