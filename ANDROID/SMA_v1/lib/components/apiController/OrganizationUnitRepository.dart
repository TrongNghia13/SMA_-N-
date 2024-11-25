import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/OrganizationUnitModel.dart';


class OrganizationUnitRepository {
  Future<List<organizationUnitModel>> fetchEmployee() async {
    final response = await http.get(Uri.parse('https://apisma.cuahangkinhdoanh.com/api/OrganizationUnit/'));

    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      final List<organizationUnitModel> organizationUnits = responseData
          .map((data) => organizationUnitModel.fromJson(data))
          .toList();
      return organizationUnits;
    } else {
      throw Exception('Không kết nối API');
    }
  }
}
