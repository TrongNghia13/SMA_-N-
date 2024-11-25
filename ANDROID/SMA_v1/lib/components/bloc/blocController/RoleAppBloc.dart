import 'package:bloc/bloc.dart';
import 'package:sma/components/apiController/RoleAppRepository.dart';
import 'package:sma/components/bloc/eventController/RoleAppEvent.dart';
import 'package:sma/components/bloc/stateController/RoleAppState.dart';


class RoleAppBloc extends Bloc<RoleAppEvent, RoleAppState> {
  final RoleAppRepository roleAppRepository;

  RoleAppBloc({required this.roleAppRepository})
      : super(const RoleAppState(status: RoleAppStateStatus.ready)) {
    on<GetListMenuAppHandle>(_handleGetListMenuAppHandle);
  }

  void _handleGetListMenuAppHandle(GetListMenuAppHandle event,
      Emitter<RoleAppState> emit) async {
    emit(const RoleAppState(status: RoleAppStateStatus.loading));
    try {
      final data = await roleAppRepository.getListMenuApp(
          userId: event.userId);
      if (data != null) {
        emit(RoleAppState(
            status: RoleAppStateStatus.exist, menuAppList: data));
      } else {
        emit(const RoleAppState(status: RoleAppStateStatus.notExist,
            message: 'Dữ liệu không tồn lại'));
      }
    } catch (error) {
      emit(RoleAppState(
          status: RoleAppStateStatus.error, message: '$error'));
    }
  }

// void _handleLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) {
//   // Xử lý logic đăng xuất ở đây
//   emit(AuthState(status: AuthStatus.unauthenticated));
// }

}