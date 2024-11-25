import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sma/components/bloc/blocController/blocSearchProductImei.dart';
import 'package:sma/components/bloc/stateController/productImeiState.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/apiController/ProductImeiRepository.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/components/bloc/eventController/ProductImeiEvent.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/pageRoutes.dart';
class SearchImeiBarWidget extends StatefulWidget {
  bool? isRoll;
  SearchImeiBarWidget(
      {super.key, required this.isRoll});

  @override
  State<SearchImeiBarWidget> createState() => _searchImeiBarWidgetState();
}

class _searchImeiBarWidgetState extends State<SearchImeiBarWidget> {
  // const searchImeiBarWidget({Key? key}) : super(key: key);


  late String imeiInput ='';

  late blocSearchProductImei _blocSearchProductImei;

  @override
  void initState() {
    _blocSearchProductImei = BlocProvider.of<blocSearchProductImei>(context);
      // _onSummitedFeild('800000046707',true);
    super.initState();
  }

  Future<void> _getProductByImei(String imeiInput, bool isRoll) async {
    try {
      // final _receptImeiRepository = receiptImeiRepository();
      // final receptImeiValue = await _receptImeiRepository.getProduct(
      //     isRoll: isRoll, imei: imeiInput);
      // setState(() {
      //   print(receptImeiValue.toString());
      //   setProductImeiModel!(receptImeiValue!);
      // });

    } catch (e) {
      // Handle API error
      print('Error: $e');
    }
  }
  void _onSummitedFeild (String imeiInput, bool? isRoll){
    _blocSearchProductImei.add(imeiRequested(
        imei: imeiInput,
        isRoll:isRoll
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(15),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(14),
          color: Colors.white,
          border: Border.all(color: smaColors.searchbar)),
      child: Row(
        children: [
          const SizedBox(width: 5),
          Expanded(
            flex: 2,
            child: TextFormField(
              controller: TextEditingController(text: imeiInput),
              decoration: InputDecoration(
                  border: InputBorder.none,
                  fillColor: Colors.red,
                  hintText: AppLocalizations.of(context).pleaseEnterImeiThreeDot,
                  hintStyle: const TextStyle(color: Colors.grey),
                  labelText: "Imei",
                  labelStyle: const TextStyle(color: Colors.red)),
              style: const TextStyle(color: Colors.black, fontSize: 15),
              onFieldSubmitted: (value) {
                // _getProductByImei(value, isRoll);
                if(value.trim().isNotEmpty){
                  _onSummitedFeild(value,widget.isRoll);
                  imeiInput = value;
                }
              },
            ),
          ),
          IconButton(
              onPressed: () {
                Navigator.of(context).pushNamed(pageRoutes.qrSearchImeiScanner, arguments: setImeiviaQrCode);
              },
              icon: const Icon(
                Icons.qr_code_scanner,
                color: Colors.red,
              ))
        ],
      ),
    );
  }
  void setImeiviaQrCode(String QRCode){
    setState(() {
      imeiInput = QRCode;
      _onSummitedFeild(imeiInput,widget.isRoll);
    });
  }
}
