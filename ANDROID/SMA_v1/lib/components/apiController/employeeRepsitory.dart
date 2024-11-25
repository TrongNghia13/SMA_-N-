import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/employeeModel.dart';

class EmployeeRepository {
  Future<List<employeeModel>> fetchEmployee() async {
    final response = await http.get(Uri.parse('https://apisma.cuahangkinhdoanh.com/api/Employee/GetALL'));

    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      final List<employeeModel> employees = responseData
          .map((data) => employeeModel.fromJson(data))
          .toList();
      return employees;
    } else {
      throw Exception('Không kết nối API');
    }
  }
}
