import 'package:bloc/bloc.dart';
import 'package:sma/components/bloc/eventController/AuthEvent.dart';
import 'package:sma/components/apiController/AuthRepository.dart';
import 'package:sma/components/bloc/eventController/ProductImeiEvent.dart';
import 'package:sma/components/bloc/stateController/AuthState.dart';
import 'package:sma/components/apiController/ProductImeiRepository.dart';
import 'package:sma/components/bloc/stateController/productImeiState.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';
class blocSearchProductImei extends Bloc<ProductImeiEvent, productImeiState> {
  final ProductImeiRepository reiRepository;

  blocSearchProductImei({required this.reiRepository})
      : super(productImeiState(status: productImeiStateStatus.empty)) {
    on<imeiRequested>(_handleImeiRequested);
    on<productImeiUpdateRequest>(_handleProductImeiUpdateRequest);

    // on<LogoutRequested>(_handleLogoutRequested);
  }

  void _handleImeiRequested(imeiRequested event,
      Emitter<productImeiState> emit) async {
    emit(const productImeiState(status: productImeiStateStatus.loading));
    try {
      final token = await reiRepository.getProductByImei(
         imei:  event.imei,isRoll:  event.isRoll);
      if (token != null) {
        emit(productImeiState(status: productImeiStateStatus.exist,data: token));
      } else {
        emit(const productImeiState(status: productImeiStateStatus.notExist,
            message: 'Dữ liệu không tồn lại'));
      }
    } catch (error) {
      emit(productImeiState(
          status: productImeiStateStatus.error, message: '$error'));
    }
  }
  void _handleProductImeiUpdateRequest(productImeiUpdateRequest event, Emitter<productImeiState> emit) async{
    try {
      final token = await reiRepository.updateProductImei(listSteelDefectDetail: event.listSteelDefectDetailModel, productImeiModel: event.productImeiModel, listImage: event.listXFile, isChange: event.isChange);
      if (token == true) {
        emit(productImeiState(status: productImeiStateStatus.finished,data: token));
      } else{
        emit(const productImeiState(status: productImeiStateStatus.notExist, data: false));
      }
    } catch (error) {
      emit(productImeiState(
          status: productImeiStateStatus.error, message: '$error'));
    }
  }


  // void _handleLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) {
  //   // Xử lý logic đăng xuất ở đây
  //   emit(AuthState(status: AuthStatus.unauthenticated));
  // }

}