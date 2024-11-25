import 'dart:ui';
import 'package:shared_preferences/shared_preferences.dart';
const String LANGUAGUE_CODE = 'languageCode';
const String ENGLISH = 'en';
const String VIETNAMESE = 'vi';
late String LANGUAGENOWINFORMATION;

Future<Locale> setLocaleSP(String languageCode) async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  await _prefs.setString(LANGUAGUE_CODE, languageCode);
  return Locale(languageCode);
}

Future<Locale> getLocaleSP() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  String languageCode = _prefs.getString(LANGUAGUE_CODE) ?? ENGLISH;
  return Locale(languageCode);
}

Future<void> setLanguageNowInformation() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  String languageCode = _prefs.getString(LANGUAGUE_CODE) ?? ENGLISH;
  LANGUAGENOWINFORMATION = languageCode;
}
