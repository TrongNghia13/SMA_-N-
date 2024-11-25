import 'package:flutter/material.dart';

class NotificationEnoughImage {
  static void showConfirmationDialog (BuildContext context){
   showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text(
            'Thông Báo',
          ),
          content:  const Text(
            'Số ảnh bạn thêm vượt quá giới hạn!',
            textAlign: TextAlign.center,
          ),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Xử lý logic khi người dùng xác nhận

                // Đóng hộp thoại và thoát khỏi màn hình
                Navigator.of(context).pop();; // xoa man hinh hien tai, load man moi len va gan gia tri
                // Navigator.of(context).popUntil((route) => pageRoutes.deliveryRequestRequestDetail_0402,);
                // Navigator.pop(context, ModalRoute.withName(pageRoutes.deliveryRequestRequestDetail_0402));
              },
              style: ElevatedButton.styleFrom(
                  primary: Colors.red, onPrimary: Colors.white),
              child: const Text('Xác nhận'),
            ),
          ],
        );
      },
    );
  }
}
