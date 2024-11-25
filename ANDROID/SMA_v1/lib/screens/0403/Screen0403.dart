import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sma/components/localStore.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/screens/0403/notificationEnoughQuantity.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';
import 'package:vibration/vibration.dart';
import 'appBar0403.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';


class Screen0403 extends StatefulWidget {
  static const String routeName = pageRoutes.qrScan0403;

  @override
  State<Screen0403> createState() => _screen0403State();
}

class _screen0403State extends State<Screen0403> {
  bool isScanCompleted = false;
  String statusQrScanner = "";
  String taskDeliverAppID="";
  int quantity = 0;
  bool isFlashOn = false;
  bool isFrontCamera = false;
  String productionPlanID="";
  bool isRoll = false;
  List<ProductOfDeliveryRequest> listProductOfDeliveryRequest = [];
  MobileScannerController mobileScannerController = MobileScannerController();
  List<String> historyScan = [];
  @override
  void initState() {
    // TODO: implement initState
    initSharedPreferences();
    super.initState();
  }

  void initSharedPreferences() async {
    localStore.prefs = await SharedPreferences.getInstance();
    setState(() {
      listProductOfDeliveryRequest =
          localStore.getListProductOfDeliveryRequest(taskDeliverAppID: taskDeliverAppID);
      statusQrScanner = listProductOfDeliveryRequest.isEmpty
          ? "${AppLocalizations.of(context).scanned} 0"
          : "${AppLocalizations.of(context).scanned} ${listProductOfDeliveryRequest.length}";
    });
  }

  @override
  Widget build(BuildContext context) {
    List<dynamic> listArguments = ModalRoute.of(context)?.settings.arguments
        as List<dynamic>; // List nhận dữ liệu truyền từ màn khác qua
    taskDeliverAppID = listArguments[0] as String; // gán giá trị tương ứng
    productionPlanID = listArguments[1] as String; // gán giá trị tương ứng
    quantity = listArguments[2] as int;
    isRoll= listArguments[3] as bool;
    return WillPopScope(
        child: Scaffold(
          appBar: appBar0403(taskDeliverAppID: taskDeliverAppID, productionPlanID: productionPlanID,quantity: quantity, isRoll: isRoll),
          body: Column(
            children: [
              Expanded(
                  flex: 2,
                  child: Container(
                    margin: const EdgeInsets.all(20),
                    width: double.infinity,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      color: smaColors.blueBox,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          height: 35,
                          child: Center(
                            child: Text(
                              AppLocalizations.of(context).noteQRScanner,
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
                              // Positioned(
                              //   top: 0, // Điều chỉnh vị trí theo mong muốn
                              //   left: 10, // Điều chỉnh vị trí theo mong muốn
                              //   child: Container(
                              //     width: 300,
                              //     height: 250,
                              //     decoration: BoxDecoration(
                              //       border: Border.all(color: Colors.red, width: 2),
                              //     ),
                              //   ),
                              // ),
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
                            Expanded(
                                flex: 2,
                                child: Text(
                                  statusQrScanner,
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(
                                      color: Colors.red,
                                      fontWeight: FontWeight.bold),
                                )),
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
                  child: SingleChildScrollView(
                    child: Column(
                      children: [Text(AppLocalizations.of(context).scanHistory,style: const TextStyle(
                          color: Colors.red,fontWeight: FontWeight.bold
                        ),),
                        for(String item in historyScan.reversed )
                          Text(item,style: const TextStyle(color: Colors.redAccent),),
                        if(historyScan.isEmpty)
                          Text(AppLocalizations.of(context).sessionQRScannedNote,style: const TextStyle(color :Colors.redAccent),)
                      ],
                    ),
                  )
              )
            ],
          ),
        ),
        onWillPop: () async {
          Navigator.of(context).popAndPushNamed(
              pageRoutes.deliveryRequestRequestDetail0402,
              arguments: [taskDeliverAppID,productionPlanID, quantity, isRoll]);
          return false;
        });
  }

  Future<void> onBarcodeCapture(BarcodeCapture capture) async { // bắt sự kiện camera
    final audioCache = AudioCache(prefix: 'assets/audios/');
    if (!isScanCompleted) {
      Object code = capture.raw ?? '----';
      String imei = '';
      final List<Barcode> barcodes = capture.barcodes;
      //isScanCompleted = true;
      for (final barcode in barcodes) {
        imei = barcode.displayValue.toString();
      }
      if (listProductOfDeliveryRequest.length >= quantity) {
        isScanCompleted = true;
        notificationEnoughQuantity.showConfirmationDialog(
          context: context,quantity: quantity,productionPlanID: productionPlanID,taskDeliverAppID: taskDeliverAppID,isRoll: isRoll);
      } else {
        if (localStore.addProductOfDeliveryList(
            taskDeliverAppID: taskDeliverAppID,
            imei: imei,
            listProductOfDeliveryRequest: listProductOfDeliveryRequest)) {
          bool checkVibration = await Vibration.hasVibrator() ?? false;
          if (checkVibration) {
            Vibration.vibrate(duration: 1000,amplitude: 255);
          }
          historyScan.add(imei);
          final url = await audioCache.load('beepsound.m4a');
          AudioPlayer a = AudioPlayer();
          await a.play(UrlSource(url.path));
          setState(() {
            statusQrScanner = "${AppLocalizations.of(context).scanned} ${listProductOfDeliveryRequest.length}";
          });
        }
      }
    }
  }
}
