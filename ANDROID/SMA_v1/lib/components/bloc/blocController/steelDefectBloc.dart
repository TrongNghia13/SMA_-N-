import 'package:bloc/bloc.dart';
import 'package:sma/components/bloc/stateController/steelDefectState.dart';
import 'package:sma/components/bloc/eventController/steelDefectEvent.dart';
import 'package:sma/components/apiController/steelDefectRepository.dart';
import 'package:sma/models/SteelDefectDetailModel.dart';

class steelDefectBloc extends Bloc<steelDefectEvent, steelDefectState> {
  final steelDefectRepository sdrRepository;

  steelDefectBloc({required this.sdrRepository})
      : super(const steelDefectState(status: steelDefectStateStatus.empty)) {
    on<cateDefectHandle>(_handleCateDefect);
    on<listDefectProductImeiHandle>(_handleSteelDefectDetailModel);
    // on<LogoutRequested>(_handleLogoutRequested);
  }

  void _handleCateDefect(cateDefectHandle event,
      Emitter<steelDefectState> emit) async {
    emit(const steelDefectState(status: steelDefectStateStatus.loading));
    try {
      final token = await sdrRepository.getCateSteelDefectByType(
          isRoll: event.isRoll);
      if (token != null) {
        emit(steelDefectState(
            status: steelDefectStateStatus.exist, defectList: token));
      } else {
        emit(const steelDefectState(status: steelDefectStateStatus.error,
            message: 'Dữ liệu không tồn lại'));
      }
    } catch (error) {
      emit(steelDefectState(
          status: steelDefectStateStatus.error, message: '$error'));
    }
  }
  void _handleSteelDefectDetailModel(listDefectProductImeiHandle event,
      Emitter<steelDefectState> emit) async {
    emit(const steelDefectState(
        status: steelDefectStateStatus.loadingListDefectByProductImei));
    try {
      final token = await sdrRepository.GetListDefectByImei(
          imei: event.imei);
      if (token != null) {
        emit(steelDefectState(
            status: steelDefectStateStatus.existListDefectByProductImei,
            productImeiDefectList: token));
      }else {
        emit(const steelDefectState(status: steelDefectStateStatus.errorListDefectByProductImei,
            message: 'Dữ liệu không tồn lại'));
      }
    }catch (error) {
      emit(steelDefectState(
          status: steelDefectStateStatus.errorListDefectByProductImei, message: '$error'));
    }
  }

// void _handleLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) {
//   // Xử lý logic đăng xuất ở đây
//   emit(AuthState(status: AuthStatus.unauthenticated));
// }

}