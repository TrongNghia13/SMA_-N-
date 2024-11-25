import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:vibration/vibration.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';


class QRSearchImeiScanner extends StatefulWidget {
  static const String routeName = pageRoutes.qrSearchImeiScanner;
  @override
  State<QRSearchImeiScanner> createState() => _qrSearchImeiScannerState();
}

class _qrSearchImeiScannerState extends State<QRSearchImeiScanner> {
  bool isScanCompleted = false;
  bool isFlashOn = false;
  bool isFrontCamera = false;
  MobileScannerController mobileScannerController = MobileScannerController();
  late Function(String) setImeiSearchBar;
  bool isScanned = false;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }


  @override
  Widget build(BuildContext context) {
    Object? listArguments = ModalRoute.of(context)?.settings.arguments;// List nhận dữ liệu truyền từ màn khác qua
    setImeiSearchBar = listArguments as Function(String); // gán giá trị tương ứng

    return WillPopScope(
        child: Scaffold(
          appBar: AppBar(
            leading: IconButton(icon: Icon(Icons.arrow_back_ios_new_rounded, color: smaColors.blue,),onPressed: () {
              Navigator.of(context).pop();
            },),
            title: Text('${AppLocalizations.of(context).searchImeiViaQRCode}',style: TextStyle(fontWeight: FontWeight.bold,color: smaColors.blue)),
            centerTitle: true,
          ),
          body: Column(
            children: [
              Expanded(
                  flex: 2,
                  child: Container(
                    margin: const EdgeInsets.all(20),
                    width: double.infinity,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      color: smaColors.blue,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          height: 35,
                          child: Center(
                            child: Text(
                              '${AppLocalizations.of(context).noteQRScanner}',
                              textAlign: TextAlign.center,
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                        Expanded(
                          flex: 2,
                          child: Stack(
                            children: [
                              Container(
                                margin:
                                const EdgeInsets.only(left: 16, right: 16),
                                color: Colors.black,
                                child: MobileScanner(
                                  controller: mobileScannerController,
                                  onDetect: (capture) {
                                    onBarcodeCapture(capture);
                                  },
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ],
                          ),

                        ),
                        Row( // Thanh điều khiển ở dưới camera
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Expanded(
                                flex: 1,
                                child: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        isFlashOn = false;
                                        isFrontCamera =! isFrontCamera;
                                      });
                                      mobileScannerController.switchCamera();
                                    },
                                    icon: Icon(
                                      Icons.flip_camera_ios,
                                      color: isFrontCamera
                                          ? Colors.white
                                          : Colors.grey,
                                      size: 35,
                                    ))),
                            const Expanded(
                                flex: 2,
                                child: SizedBox()),
                            Expanded(
                                flex: 1,
                                child: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        isFlashOn = !isFlashOn;
                                      });
                                      mobileScannerController.toggleTorch();
                                    },
                                    icon: Icon(
                                      Icons.flashlight_on,
                                      color: isFlashOn
                                          ? Colors.white
                                          : Colors.grey,
                                      size: 35,
                                    )))
                          ],
                        ) // Thanh điều khiển ở dưới camera
                      ],
                    ),
                  )),
               Expanded(
                  flex: 1,
                  child: Container(
                    margin: const EdgeInsets.only(right: 25,left: 25,bottom: 25,top: 5),
                    child: ClipOval(
                      child: Image.asset(
                        'assets/images/logo/2.png',
                        fit: BoxFit.cover,
                      ),
                    ),
                  )
              )
            ],
          ),
        ),
        onWillPop: () async {
          Navigator.of(context).pop();
          return false;
        });
  }

  Future<void> onBarcodeCapture(BarcodeCapture capture) async { // bắt sự kiện camera
    final audioCache = AudioCache(prefix: 'assets/audios/');
    if(!isScanned){
      isScanned = true;
      Object code = capture.raw ?? '----';
      String imei = '';
      final List<Barcode> barcodes = capture.barcodes;
      //isScanCompleted = true;
      for (final barcode in barcodes) {
        imei = barcode.displayValue.toString();
        debugPrint(imei);
      }
      final url = await audioCache.load('beepsound.m4a');
      AudioPlayer a = AudioPlayer();
      await a.play(UrlSource(url.path));
      bool checkVibration = await Vibration.hasVibrator() ?? false;
      if (checkVibration) {
        Vibration.vibrate(duration: 1000,amplitude: 255);
      }
      Navigator.of(context).pop();
      setImeiSearchBar(imei);
    }
  }
}
