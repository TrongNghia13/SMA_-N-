import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/WorkProcessModel.dart';

class InformationProduct extends StatelessWidget {
  final List<ProductImeiModel> productImeiList;
  final List<workProcessModel> workProcess;
  final String? specification;
  final String? vendor;
  final String? steelType;
  final String? standard;
  final String? productionBatchNo;
  final String? galvanizedOrganization;
  final String? steelPrice;
  final String? width;
  final String? thickness;
  final double? weight1;
  final double? weight2;
  final double? weight3;
  final String? note;
  final String? createdBy;
  final String? createdDate;
  final String? workName;

  const InformationProduct({required this.productImeiList,required this.workProcess, this.specification, this.vendor, this.steelType, this.standard, this.productionBatchNo, this.galvanizedOrganization
  ,this.steelPrice, this.width, this.thickness, this.weight1, this.weight2, this.weight3, this.note, this.createdBy, this.createdDate, this.workName});


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                AppLocalizations.of(context).specificationProduct,
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 5),
              if (specification == null || specification!.isEmpty)
                Text(
                  AppLocalizations.of(context).noData,
                  style: TextStyle(fontSize: 16, color: Colors.red),
                )
              else
                Text(
                  specification!,
                  style: TextStyle(fontSize: 16, color: Colors.blue),
                ),
              SizedBox(height: 5),
              Text(
                AppLocalizations.of(context).workStatusProduct,
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 5),
              Center(
                child: Container(
                  decoration: BoxDecoration(
                    color: smaColors.blueBox,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center, // Căn giữa dòng văn bản
                      children: [
                        if (workName == null || workName!.isEmpty)
                          Text(
                            AppLocalizations.of(context).noData,
                            style: TextStyle(fontSize: 16, color: Colors.red),
                          )
                        else
                          Text(
                            workName!,
                            style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold),
                          ),
                      ],
                    ),
                  ),
                ),
              ),
              SizedBox(height: 10),
              Row(
                children: [
                Text(
                  AppLocalizations.of(context).supplierProduct,
                  style: TextStyle(fontSize: 16),
                ),
                  //SizedBox(width: 5),
                  if (vendor == null || vendor!.isEmpty)
                    Text(
                      AppLocalizations.of(context).noData,
                      style: TextStyle(fontSize: 16, color: Colors.red),
                    )
                  else
                  Text(
                    vendor!,
                    style: TextStyle(fontSize: 16,color: Colors.blue),
                  ),
                ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).steelProduct,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 79),
                    if (steelType == null || steelType!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                    Text(
                      steelType!,
                      style: TextStyle(fontSize: 16,color: Colors.blue),
                    ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).standardProduct,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 66),
                    if (standard == null || standard!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                    Text(
                      standard!,
                      style: TextStyle(fontSize: 16,color: Colors.blue),
                    ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).lotNumber,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 110),
                    if (productionBatchNo == null || productionBatchNo!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        productionBatchNo!,
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).galvanizedUnit,
                      style: TextStyle(fontSize: 16),
                    ),
                   // SizedBox(width: 40),
                    if (galvanizedOrganization == null || galvanizedOrganization!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        galvanizedOrganization!,
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).purchasePrice,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 85),
                    if (steelPrice == null || steelPrice!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        steelPrice!,
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).widthProduct,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 115),
                    if (width == null || width!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        width!,
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).thicknessProduct,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 72),
                    if (thickness == null || thickness!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        thickness!,
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).weightProduct1,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 50),
                    if (weight1 == null)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        weight1.toString(),
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).weightProduct2,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 50),
                    if (weight2 == null)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        weight2.toString(),
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).weightProduct3,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 50),
                    if (weight3 == null)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        weight3.toString(),
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Text(
                AppLocalizations.of(context).noteProduct,
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 10),
              Container(
                decoration: BoxDecoration(
                  color: Colors.grey,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Padding(
                  padding: EdgeInsets.all(10),
                  child: Row(
                    children: [
                      if (note == null || note!.isEmpty)
                        Text(
                          AppLocalizations.of(context).noData,
                          style: TextStyle(fontSize: 16, color: Colors.red),
                        )
                      else
                        Text(
                          note!,
                          style: TextStyle(fontSize: 14, color: Colors.black),
                        ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 10),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).creator,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 6),
                    if (createdBy == null || createdBy!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        createdBy!,
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ]
              ),
              SizedBox(height: 5),
              Row(
                  children: [
                    Text(
                      AppLocalizations.of(context).dateCreated,
                      style: TextStyle(fontSize: 16),
                    ),
                    //SizedBox(width: 10),
                    if (createdDate == null || createdDate!.isEmpty)
                      Text(
                        AppLocalizations.of(context).noData,
                        style: TextStyle(fontSize: 16, color: Colors.red),
                      )
                    else
                      Text(
                        createdDate!,
                        style: TextStyle(fontSize: 16,color: Colors.blue),
                      ),
                  ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
