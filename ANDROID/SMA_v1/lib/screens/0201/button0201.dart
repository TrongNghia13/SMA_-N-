import 'package:flutter/material.dart';
import 'package:sma/components/smaColors.dart';
import 'package:google_fonts/google_fonts.dart';

class Button0201 extends StatefulWidget {
  const Button0201({Key? key}) : super(key: key);

  @override
  State<Button0201> createState() => _Button0201State();
}

class _Button0201State extends State<Button0201> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Button Yêu cầu xuất kho
              GestureDetector(
                onTap: () {
                  // Xử lý khi khung được nhấp vào
                  // Chuyển sang trang khác
                },
                child: Container(
                  margin: EdgeInsets.only(left: 55, right: 10),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: smaColors.blueBox,
                  ),
                  child: Stack(
                    alignment: Alignment.topLeft, // Vị trí gốc của Stack
                    children: [
                      Container(
                        height: 100,
                        width: 150,
                      ),
                      Positioned(
                        left: 15, // Vị trí trái của hình tròn riêng
                        top: 15, // Vị trí trên của hình tròn riêng
                        child: Container(
                          height: 65, // Kích thước hình tròn riêng
                          width: 65, // Kích thước hình tròn riêng
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                          ),
                          child: Icon(
                            Icons.drive_file_move,
                            size: 40,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Khoảng cách giữa hình tròn và chữ văn bản
                      Positioned(
                        left: 85, // Vị trí trái của văn bản
                        top: 30, // Vị trí trên của văn bản
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Yêu cầu',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            SizedBox(height: 5), // Khoảng cách giữa hai đoạn văn bản
                            Text(
                              'xuất kho',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Button Yêu cầu xuất kho
              GestureDetector(
                onTap: () {
                  // Xử lý khi khung được nhấp vào
                  // Chuyển sang trang khác
                },
                child: Container(
                  margin: EdgeInsets.only(left: 25, right: 55, top: 5),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: smaColors.blueBox,
                  ),
                  child: Stack(
                    alignment: Alignment.topLeft, // Vị trí gốc của Stack
                    children: [
                      Container(
                        height: 100,
                        width: 150,
                      ),
                      Positioned(
                        left: 15, // Vị trí trái của hình tròn riêng
                        top: 15, // Vị trí trên của hình tròn riêng
                        child: Container(
                          height: 65, // Kích thước hình tròn riêng
                          width: 65, // Kích thước hình tròn riêng
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                          ),
                          child: Icon(
                            Icons.drive_file_move,
                            size: 40,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Khoảng cách giữa hình tròn và chữ văn bản
                      Positioned(
                        left: 85, // Vị trí trái của văn bản
                        top: 30, // Vị trí trên của văn bản
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Yêu cầu',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            SizedBox(height: 5), // Khoảng cách giữa hai đoạn văn bản
                            Text(
                              'xuất kho',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 10), // Khoảng cách giữa hàng đầu và hàng dưới
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Button Yêu cầu xuất kho
              GestureDetector(
                onTap: () {
                  // Xử lý khi khung được nhấp vào
                  // Chuyển sang trang khác
                },
                child: Container(
                  margin: EdgeInsets.only(left: 55, right: 10, top: 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: smaColors.blueBox,
                  ),
                  child: Stack(
                    alignment: Alignment.topLeft, // Vị trí gốc của Stack
                    children: [
                      Container(
                        height: 100,
                        width: 150,
                      ),
                      Positioned(
                        left: 15, // Vị trí trái của hình tròn riêng
                        top: 15, // Vị trí trên của hình tròn riêng
                        child: Container(
                          height: 65, // Kích thước hình tròn riêng
                          width: 65, // Kích thước hình tròn riêng
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                          ),
                          child: Icon(
                            Icons.drive_file_move,
                            size: 40,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Khoảng cách giữa hình tròn và chữ văn bản
                      Positioned(
                        left: 85, // Vị trí trái của văn bản
                        top: 30, // Vị trí trên của văn bản
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Yêu cầu',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            SizedBox(height: 5), // Khoảng cách giữa hai đoạn văn bản
                            Text(
                              'xuất kho',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              //Kiểm tra yêu cầu xuất kho
              GestureDetector(
                onTap: () {
                  // Xử lý khi khung được nhấp vào
                  // Chuyển sang trang khác
                },
                child: Container(
                  margin: EdgeInsets.only(left: 25, right: 55, top: 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: smaColors.blueBox,
                  ),
                  child: Stack(
                    alignment: Alignment.topLeft, // Vị trí gốc của Stack
                    children: [
                      Container(
                        height: 100,
                        width: 150,
                      ),
                      Positioned(
                        left: 15, // Vị trí trái của hình tròn riêng
                        top: 15, // Vị trí trên của hình tròn riêng
                        child: Container(
                          height: 65, // Kích thước hình tròn riêng
                          width: 65, // Kích thước hình tròn riêng
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                          ),
                          child: Icon(
                            Icons.fact_check,
                            size: 40,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      SizedBox(width: 10), // Khoảng cách giữa hình tròn và chữ văn bản
                      Positioned(
                        left: 85, // Vị trí trái của văn bản
                        top: 20, // Vị trí trên của văn bản
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Kiểm tra',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            SizedBox(height: 5), // Khoảng cách giữa hai đoạn văn bản
                            Text(
                              'yêu cầu',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            SizedBox(height: 5), // Khoảng cách giữa hai đoạn văn bản
                            Text(
                              'xuất kho',
                              style: GoogleFonts.lato(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
