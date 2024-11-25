import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sma/models/loginModel.dart';
class AuthRepository {
  Future<String?> login(String username, String password, String branchID) async {
    try {
      loginModel login = loginModel(UserName: username, PassWord: password, BranchID: branchID);
      final response = await http.post(
        Uri.parse('https://apisma.cuahangkinhdoanh.com/api/Login'),
        headers: {'Content-Type': 'application/json'},
        body: login.modelToJsonEncode(),
      );
      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);
        final token = jsonResponse['data'];
        return token;
      } else {
        throw Exception('Không kết nối đc api');
      }
    } catch (error) {
      throw Exception('Không kết nối đc api');
    }
  }
  Future<bool> changePassword({required String username, required String password, required String newPassword}) async {
    try {
      loginModel login = loginModel(UserName: username, PassWord: password, BranchID: '0',NewPassword: newPassword);
      final response = await http.post(
        Uri.parse('https://apisma.cuahangkinhdoanh.com/api/Login/ChangePassword'),
        headers: {'Content-Type': 'application/json'},
        body: login.modelToJsonEncode(),
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  Future<bool> setRegistrationToken({required int userId, required String token}) async {
    try {
      final response = await http.put(
        Uri.parse('https://apisma.cuahangkinhdoanh.com/api/User/SetRegistrationToken/SetRegistrationToken/$userId?registrationToken=$token'),
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}








