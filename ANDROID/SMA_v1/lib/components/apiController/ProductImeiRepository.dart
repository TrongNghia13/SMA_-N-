import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:sma/models/UploadProductImeiDetailModel.dart';

class ProductImeiRepository {
  Future<ProductImeiModel?> getProductByImei(
      {required String imei, bool? isRoll}) async {
    try {
      String encodedImei = Uri.encodeComponent(imei);
      String uri;
      if (isRoll == null) {
        uri =
            'https://apisma.cuahangkinhdoanh.com/api/ProductImei/GetProductByImei/$encodedImei';
      } else if (isRoll == true) {
        uri =
            'https://apisma.cuahangkinhdoanh.com/api/ProductImei/GetRollByImei/$encodedImei';
      } else {
        uri =
            'https://apisma.cuahangkinhdoanh.com/api/ProductImei/GetTapeByImei/$encodedImei';
      }
      final response = await http.get(Uri.parse(uri));
      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);
        final token = jsonResponse['data']; // chỉ lấy data
        if (token != null) {
          ProductImeiModel riModel = ProductImeiModel.fromJson(token);
          return riModel;
        }
      } else {
        throw Exception('${response.statusCode}');
      }
    } catch (error) {
      print(error);
      throw Exception('Không kết nối đc api + $error');
    }
  }

  Future<bool?> updateProductImei(
      {required ProductImeiModel productImeiModel,
      required List<XFile> listImage,
      required List<SteelDefectDetailModel> listSteelDefectDetail, required bool isChange}) async {
    try {

      String uriLink = '';
      if (listImage.isNotEmpty) {
        uriLink =
            'https://apisma.cuahangkinhdoanh.com/api/ProductImei/UploadProductImeiWithImage';
        var request = http.MultipartRequest(
          'POST',
          Uri.parse(uriLink),
        );
        for (int i = 0; i < listImage.length; i++) {
          var imageFile = await listImage[i].readAsBytes();
          var imagePart = http.MultipartFile.fromBytes('imageFiles', imageFile,
              filename: listImage[i].name);
          request.files.add(imagePart);
        }
        // Thêm dữ liệu model vào yêu cầu
        request.fields['ProductImeiID'] = productImeiModel.productImeiID.toString();
        productImeiModel.receiptImeiID == null ? "" : request.fields['ReceiptImeiID'] = productImeiModel.receiptImeiID.toString();
        request.fields['WorkProcessID'] = productImeiModel.workProcessID ?? "";
        request.fields['Imei'] = productImeiModel.imei ?? "";
        request.fields['ProductID'] = productImeiModel.productID ?? "";
        if(productImeiModel.quantity != null){
          request.fields['Quantity'] = productImeiModel.quantity.toString();
        }
        request.fields['Standard'] = productImeiModel.standard ?? "";
        request.fields['ProductionBatchNo'] = productImeiModel.productionBatchNo ?? "";
        request.fields['GalvanizedOrganization'] = productImeiModel.galvanizedOrganization ?? "";
        request.fields['SteelPrice'] = productImeiModel.steelPrice ?? "";
        request.fields['Vendor'] = productImeiModel.vendor ?? "";
        request.fields['SteelType'] = productImeiModel.steelType ?? "";
        request.fields['Width'] = productImeiModel.width ?? "";
        request.fields['Thickness'] = productImeiModel.thickness ?? "";
        if(productImeiModel.weight1 != null){
          request.fields['Weight1'] = productImeiModel.weight1.toString();
        }
        if(productImeiModel.weight2 != null){
          request.fields['Weight2'] = productImeiModel.weight2.toString();
        }
        if(productImeiModel.weight3 != null){
          request.fields['Weight3'] = productImeiModel.weight3.toString();
        }
        request.fields['Specification'] = productImeiModel.specification ?? "";
        request.fields['Note'] = productImeiModel.note ?? "";
        request.fields['Image1'] = productImeiModel.image1 ?? "";
        request.fields['Image2'] = productImeiModel.image2 ?? "";
        request.fields['Image3'] = productImeiModel.image3 ?? "";
        request.fields['Image4'] = productImeiModel.image4 ?? "";
        if(productImeiModel.parentID != null){
          request.fields['ParentID'] = productImeiModel.parentID.toString();
        }
        request.fields['CreatedBy'] = productImeiModel.createdBy ?? "";
        var response = await request.send();
        if (response.statusCode == 200) {
          productImeiModel = await getProductByImei(imei: productImeiModel.imei ?? "") ?? productImeiModel;
        } else {
          return false;
        }
      } else {
        uriLink = 'https://apisma.cuahangkinhdoanh.com/api/ProductImei/Update/${productImeiModel.productImeiID}';
        final response = await http.put(
          Uri.parse(uriLink), headers: {'Content-Type': 'application/json'},
          body: productImeiModel.modelToJsonEncode(),
        );
      }
      if(listSteelDefectDetail.isNotEmpty){
        uriLink = 'https://apisma.cuahangkinhdoanh.com/api/SteelDefectDetail/UpdateProductImeiSteelDefect';
        UploadProductImeiDetailModel uploadModel = UploadProductImeiDetailModel(
            productImeiModel: productImeiModel,
            listSteelDefectDetailModel: listSteelDefectDetail);
        final response = await http.post(
         Uri.parse(uriLink), headers: {'Content-Type': 'application/json'},
          body: uploadModel.modelToJsonEncode(),
        );
        if(response.statusCode  == 200){
          return true;
        }else{
          return false;
        }
      } else if(isChange == true){
        uriLink = 'https://apisma.cuahangkinhdoanh.com/api/SteelDefectDetail/DeleteAllDefectByImei';
        final response = await http.post(
          Uri.parse(uriLink), headers: {'Content-Type': 'application/json'},
          body: productImeiModel.modelToJsonEncode(),
        );
        if(response.statusCode == 200){
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw Exception('Không kết nối đc api $error');
    }
  }
}
