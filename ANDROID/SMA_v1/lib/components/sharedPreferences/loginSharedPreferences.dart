import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

const String LOGIN_CODE = 'loginCode';
const String EMPTY = '{}';
late UserLoginModel userLoginModelSP;
Future<UserLoginModel> setUserLoginSP(dynamic tokenJsonString) async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  final jwt = JWT.decode(tokenJsonString).payload;
  final enCode = jsonEncode(jwt);
  await _prefs.setString(LOGIN_CODE, enCode);
  UserLoginModel userLoginModel = UserLoginModel.fromJson(jwt);
  userLoginModelSP =  userLoginModel;
  return userLoginModel;
}

Future<UserLoginModel> getUserLoginSP() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  String loginString= _prefs.getString(LOGIN_CODE) ?? EMPTY;
  final jsonList = jsonDecode(loginString);
  UserLoginModel userLoginModel = UserLoginModel.fromJson(jsonList);
  return userLoginModel;
}
Future<bool> clearLoginUserModelSP() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  try{
    _prefs.remove(LOGIN_CODE);
    return true;
  }catch (ex){
    return false;
  }
}

