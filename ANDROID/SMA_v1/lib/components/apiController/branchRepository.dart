import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/branchModel.dart';

class BranchRepository {
  Future<List<branchModel>> fetchBranches() async {
    final response = await http.get(Uri.parse('https://apisma.cuahangkinhdoanh.com/api/Branch/GetALL'));

    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      final List<branchModel> branches = responseData
          .map((data) => branchModel.fromJson(data))
          .toList();
      return branches;
    } else {
      throw Exception('Không kết nối API');
    }
  }
}
