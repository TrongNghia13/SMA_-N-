import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sma/components/onPressBackButtonLogic.dart';
import 'package:sma/components/localStore.dart';
import '../../components/apiController/TaskDeliverDetailRepository.dart';
import '../../components/bloc/blocController/TaskDeliverDetailBloc.dart';
import 'AppBar0402.dart';
import 'ProductDeliveryEmptyView0402.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';
import 'ProductOfDeliveryListView0402.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
List<ProductOfDeliveryRequest> listProductOfDeliveryRequest = []; // tạo mảng để lưu dữ liệu hiển thị
class Screen0402 extends StatefulWidget {
  static const String routeName = pageRoutes.deliveryRequestRequestDetail0402;

  @override
  State<Screen0402> createState() => _Screen0402State();
}

class _Screen0402State extends State<Screen0402> {
  String taskDeliverAppID='';
  String productionPlanID='';
  int quantity = 0;
  bool isRoll = false;
  final TaskDeliverDetailRepository _taskDeliverDetailRepository = TaskDeliverDetailRepository();

  @override
  Widget build(BuildContext context) {
    List<dynamic> listArguments =
        ModalRoute.of(context)?.settings.arguments as List<dynamic>;
    if(listArguments.isNotEmpty){
      taskDeliverAppID = listArguments[0] as String;
      productionPlanID = listArguments[1] as String;
      quantity = listArguments[2] as int;
      isRoll = listArguments[3] as bool;
    }

    return BlocProvider(
      create: (context) => TaskDeliverDetailBloc(taskDeliverDetailRepository: _taskDeliverDetailRepository),
      child: WillPopScope( // Bắt sự kiện khi người dùng trở về ko phải trên appbar mà bằng thanh điều hướng
          child: Scaffold(
            appBar: AppBar0402(productionPlanID: productionPlanID,quantity: quantity,taskDeliverAppID: taskDeliverAppID,isRoll: isRoll), // gán appBar bằng template đã tạo trước đó và gán title là mã lô
            body: bodyScreen_0402(taskDeliverAppID: taskDeliverAppID,productionPlanID: productionPlanID,quantity: quantity),
            floatingActionButton:
            FloatingActionButton(
              // nút thêm sản phaarm
              backgroundColor: Colors.red,
              tooltip: AppLocalizations.of(context).qrScanner,
              onPressed: () {
                Navigator.of(context).popAndPushNamed(pageRoutes.qrScan0403,
                   arguments: [taskDeliverAppID,productionPlanID, quantity, isRoll]);
              },
              child: const Icon(Icons.qr_code_rounded, color: Colors.white, weight: 35),
            )
          ),
          onWillPop: () async {
            onPressBackButtonLogic.showConfirmationDialog(
                context: context); // hiện thông báo xác nhận
            return false; // không trở về màn trước tự động
          }),
    );
  }
}

class bodyScreen_0402 extends StatefulWidget {
  bodyScreen_0402({Key? key,required this.taskDeliverAppID,required this.quantity,required this.productionPlanID}) : super(key: key);
  String taskDeliverAppID;
  String productionPlanID;
  int quantity;
  @override
  State<bodyScreen_0402> createState() => _bodyScreen_0402State();
}

class _bodyScreen_0402State extends State<bodyScreen_0402>
    with WidgetsBindingObserver {
  @override
  void initState() {
    initSharedPreferences(); // chạy hàm khai báo localstore
    super.initState();
  }

  void initSharedPreferences() async {
    localStore.prefs = await SharedPreferences.getInstance();
    setState(() {
      listProductOfDeliveryRequest = localStore
          .getListProductOfDeliveryRequest(taskDeliverAppID: widget.taskDeliverAppID); // gán list data bằng danh sách đc lưu trong lcs
      // localStore.saveProductOfDeliveryList(taskDeliverAppID: widget.taskDeliverAppID, listProductOfDeliveryRequest: fakeProductOfDeliveryRequest);
      //listProductOfDeliveryRequest = fakeProductOfDeliveryRequest;
    });
  }

  void deleteProductEvent(String value) { // ham xu ly su kien khi nguoi dung bam xoa o table
    setState(() {
      listProductOfDeliveryRequest?.removeWhere((element) => element.imei == value);
      for(var i = 0;i<listProductOfDeliveryRequest.length;i++) {
        listProductOfDeliveryRequest[i].sttSanPham = i + 1;
      }
      localStore.saveProductOfDeliveryList( // luu lai lcs
          taskDeliverAppID: widget.taskDeliverAppID,
          listProductOfDeliveryRequest: listProductOfDeliveryRequest);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column( // widget dong
      mainAxisAlignment: MainAxisAlignment.center,
      children: [ // gom co 2 dong
        Container( // hien thi so luong san pham
          width: double.infinity,
          height: 50,
          margin: const EdgeInsets.all(25),
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12), color: Colors.black12),
          child: Center(
              child: Text(
            '${AppLocalizations.of(context).quantityProductRequirement} ${widget.quantity} ',
            textAlign: TextAlign.center,
            style: const TextStyle(
                color: Colors.red, fontWeight: FontWeight.bold),
          )),
        ),
        Expanded(child: checkNullAPI()) // dong thu 2 hien thi danh sach
      ],
    );
  }

  Widget checkNullAPI() { // check hien thi thong tin du lieu
    if (listProductOfDeliveryRequest.isEmpty) { // check rong
      return ProductDeliveryEmptyView0402(); // hien thi widget rong
    } else {
      return ProductOfDeliveryListView0402(
          listProductOfDeliveryRequest: listProductOfDeliveryRequest,
          deleteFunctionEvent: deleteProductEvent); // hien thi danh sach san pham, callback deleteProduct
    }
  }
}
