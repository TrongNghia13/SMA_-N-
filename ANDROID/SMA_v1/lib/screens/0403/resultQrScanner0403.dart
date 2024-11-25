import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:qr_flutter/qr_flutter.dart';

class resultQrScanner0403 extends StatelessWidget {
  late final String displayValue;
  late final Function() closeScreen;
  resultQrScanner0403({required this.closeScreen,required this.displayValue});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(icon: Icon(Icons.arrow_back), onPressed: (){
          closeScreen();
          Navigator.pop(context);
        },),
        centerTitle: true,
        title: const Text(
          "QR Result Test",
          style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
            // letterSpacing: 1
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            // QrImage()
            QrImageView(
              data: '',
              size: 150,
              version: QrVersions.auto,
            ),
            Text("${displayValue.toString()}, ${displayValue.runtimeType}"),
            const SizedBox(
              height: 10,
            ),
            const SizedBox(
              // width: MediaQuery.of(context).size.width - 100,
              child: ElevatedButton(onPressed: null, child: Text('Copy')),
            )
          ],
        ),
      ),
    );
  }
}
