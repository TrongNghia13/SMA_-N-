import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/jobTitleModel.dart';

class JobTilteRepository {
  Future<List<jobTitleModel>> fetchEmployee() async {
    final response = await http.get(Uri.parse('https://apisma.cuahangkinhdoanh.com/api/CateJobTitle/GetALL'));

    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      final List<jobTitleModel> jobTitles = responseData
          .map((data) => jobTitleModel.fromJson(data))
          .toList();
      return jobTitles;
    } else {
      throw Exception('Không kết nối API');
    }
  }
}
