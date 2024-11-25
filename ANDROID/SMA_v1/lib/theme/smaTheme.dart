import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sma/components/smaColors.dart';

class smaTheme {
  static ThemeData lightTheme(BuildContext context) {
    return ThemeData(
      // Đặt font chữ mặc định cho cả ứng dụng
      fontFamily: GoogleFonts.lato().fontFamily,
      colorScheme: ColorScheme.fromSeed(
        seedColor: Colors.white, // Trắng là màu gốc (seed)
        primary: Colors.blue, // Màu chính là xanh dương
        onPrimary: Colors.white, // Màu chữ trên nền chính là trắng
        secondary: Colors.lime, // Màu phụ là xanh lá cây
        onSecondary: Colors.white, // Màu chữ trên nền phụ là trắng
      ),
      useMaterial3: true,
      // brightness: Brightness.dark,

      // Các thuộc tính khác của theme
      // ...
    );
  }
}