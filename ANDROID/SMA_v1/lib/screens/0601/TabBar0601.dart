import 'package:flutter/material.dart';
import 'package:sma/components/apiController/ProductImeiRepository.dart';
import 'package:sma/components/apiController/steelDefectRepository.dart';
import 'package:sma/components/apiController/workProcessRepository.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:sma/models/WorkProcessModel.dart';
import 'package:sma/screens/0601/ErrorProduct0601.dart';
import 'package:sma/screens/0601/ImageProduct0601.dart';
import 'package:sma/screens/0601/InformationProductImei0601.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';



class TabBarPage extends StatefulWidget {
  final ProductImeiModel piModel; // Accept ProductImeiModel as parameter
  final ProductImeiRepository _ProductImeiRepository = ProductImeiRepository();
  final steelDefectRepository _steelDefectRepository = steelDefectRepository();
  final WorkProcessRepository _workProcessRepository = WorkProcessRepository();

  TabBarPage({Key? key, required this.piModel}) : super(key: key);

  @override
  _TabBarPageState createState() => _TabBarPageState();
}

class _TabBarPageState extends State<TabBarPage>
    with SingleTickerProviderStateMixin {
  List<SteelDefectDetailModel>? steelDefectDetailModel;
  late TabController tabController;
  String? specification;
  String? vendor;
  String? steelType;
  String? standard;
  String? productionBatchNo;
  String? galvanizedOrganization;
  String? steelPrice;
  String? width;
  String? thickness;
  double? weight1;
  double? weight2;
  double? weight3;
  String? note;
  String? createdBy;
  String? createdDate;
  String? steelDefectName;
  String? workName;
  String? workProcessID;

  @override
  void initState() {
    tabController = TabController(length: 3, vsync: this);
    fetchProductImeiData();
    fetchSteelDefectDetailData();
    fetchWorkProcessData();
    super.initState();
  }

  @override
  void dispose() {
    tabController.dispose();
    super.dispose();
  }

  Future<void> fetchProductImeiData() async {
    try {
      ProductImeiModel? productImeiModel =
      await widget._ProductImeiRepository.getProductByImei(
        imei: widget.piModel.imei!,
        isRoll: null,
      );

      if (productImeiModel != null) {
        setState(() {
          specification = productImeiModel.specification;
          vendor = productImeiModel.vendor;
          steelType = productImeiModel.steelType;
          standard = productImeiModel.standard;
          productionBatchNo = productImeiModel.productionBatchNo;
          galvanizedOrganization = productImeiModel.galvanizedOrganization;
          steelPrice = productImeiModel.steelPrice;
          width = productImeiModel.width;
          thickness = productImeiModel.thickness;
          weight1 = productImeiModel.weight1;
          weight2 = productImeiModel.weight2;
          weight3 = productImeiModel.weight3;
          note = productImeiModel.note;
          createdBy = productImeiModel.createdBy;
          createdDate = productImeiModel.createdDate;
        });
      } else {
        print('Product with IMEI ${widget.piModel.imei} not found.');
      }
    } catch (error) {
      print('Error fetching data: $error');
    }
  }

  Future<void> fetchSteelDefectDetailData() async {
    try {
      List<SteelDefectDetailModel>? steelDefectDetailModel =
      await widget._steelDefectRepository.GetListDefectByImei(
        imei: widget.piModel.imei!,
      );
      if (steelDefectDetailModel!.isNotEmpty) {
        setState(() {
          steelDefectName = '';
          for (var defect in steelDefectDetailModel) {
            if (defect.steelDefectName != null) {
              steelDefectName ??= '';
              steelDefectName =
                  steelDefectName! + defect.steelDefectName! + ' ';
            }
          }
          if (steelDefectName != null && steelDefectName!.isNotEmpty) {
            steelDefectName =
                steelDefectName!.substring(0, steelDefectName!.length - 2);
          }
        });
      } else {
        print('Không tìm thấy sản phẩm với IMEI ${widget.piModel.imei}.');
      }
    } catch (error) {
      print('Lỗi khi truy vấn dữ liệu: $error');
    }
  }

  Future<void> fetchWorkProcessData() async {
    try {
      List<workProcessModel> workProcesses =
      await widget._workProcessRepository.workProcesee();

      workProcessModel? foundWorkProcess = workProcesses.firstWhere(
            (workProcess) =>
        workProcess.workProcessID == widget.piModel.workProcessID,

      );

      if (foundWorkProcess != null) {
        setState(() {
          workName = foundWorkProcess.workName;
        });
      } else {
        print('Không tìm thấy quá trình làm việc cho IMEI ${widget.piModel.imei}.');
      }
    } catch (error) {
      print('Lỗi khi truy vấn dữ liệu quá trình làm việc: $error');
    }
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 20),
        child: Container(
          height: MediaQuery.of(context).size.height,
          child: Column(
            children: [
              SizedBox(height: 5),
              Container(
                width: MediaQuery.of(context).size.width,
                decoration: BoxDecoration(
                  color: smaColors.grey,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: TabBar(
                  unselectedLabelColor: smaColors.blueBox2,
                  labelColor: Colors.white,
                  indicator: BoxDecoration(
                    color: smaColors.blueBox,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  indicatorPadding: EdgeInsets.zero,
                  indicatorSize: TabBarIndicatorSize.tab,
                  controller: tabController,
                  tabs: [
                    Tab(
                      text: AppLocalizations.of(context).informationProduct,
                    ),
                    Tab(
                      text: AppLocalizations.of(context).errorProduct,
                    ),
                    Tab(
                      text: AppLocalizations.of(context).imageProduct,
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Expanded(
                child: TabBarView(
                  controller: tabController,
                  children: [
                    InformationProduct(
                      productImeiList: [widget.piModel],
                      workProcess: [], // Pass the workProcess list here
                      specification: specification,
                      vendor: vendor,
                      steelType: steelType,
                      standard: standard,
                      productionBatchNo: productionBatchNo,
                      galvanizedOrganization: galvanizedOrganization,
                      steelPrice: steelPrice,
                      width: width,
                      thickness: thickness,
                      weight1: weight1,
                      weight2: weight2,
                      weight3: weight3,
                      note: note,
                      createdBy: createdBy,
                      createdDate: createdDate,
                      workName: workName, // Pass the workName here
                    ),
                    ErrorProduct(
                      SteelDefectDetail: steelDefectDetailModel ?? [],
                      steelDefectName: steelDefectName,
                      note: note,
                      productImeiList: [widget.piModel],
                    ),
                    ImageProductRoll(productImeiList: [
                      widget.piModel,
                    ]),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

// ... Rest of your code
