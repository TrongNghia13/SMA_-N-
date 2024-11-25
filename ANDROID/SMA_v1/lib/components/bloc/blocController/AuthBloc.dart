import 'package:bloc/bloc.dart';
import 'package:sma/components/bloc/eventController/AuthEvent.dart';
import 'package:sma/components/apiController/AuthRepository.dart';
import 'package:sma/components/bloc/stateController/AuthState.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository authRepository;


  AuthBloc({required this.authRepository,})
      : super(AuthState(status: AuthStatus.unauthenticated)) {
    on<LoginRequested>(_handleLoginRequested);
    on<LogoutRequested>(_handleLogoutRequested);
    on<ChangePasswordRequested>(_handleChangePasswordRequested);
    on<SetRegistrationTokenRequested>(_handleSetRegistrationTokenRequested);
  }

  void _handleLoginRequested(LoginRequested event,
      Emitter<AuthState> emit) async {
    emit(AuthState(status: AuthStatus.loading));

    try {
      final token = await authRepository.login(
          event.UserName, event.PassWord, event.BranchID);
      if (token != null) {
        emit(AuthState(status: AuthStatus.authenticated,error: token));
      } else {
        emit(const AuthState(status: AuthStatus.unauthenticated,
            error: 'Thông tin đăng nhập không chính xác.'));
      }
    } catch (error) {
      emit(AuthState(
          status: AuthStatus.unauthenticated, error: 'Vui lòng đăng nhập lại'));
    }
  }

  void _handleLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) async {
    // Xử lý logic đăng xuất ở đây
    emit(const AuthState(status: AuthStatus.unauthenticated));
  }
  void _handleChangePasswordRequested(ChangePasswordRequested event,Emitter<AuthState> emit) async{
    emit(const AuthState(status: AuthStatus.loading));
    try {
      final token = await authRepository.changePassword(
        username: event.username,password: event.password,newPassword: event.newPassword);
      if (token == true) {
        emit(const AuthState(status: AuthStatus.changecomplete));
      } else {
        emit(const AuthState(status: AuthStatus.error,
            error: ''));
      }
    } catch (error) {
      emit(AuthState(
          status: AuthStatus.error, error: ''));
    }
  }
  void _handleSetRegistrationTokenRequested(SetRegistrationTokenRequested event, Emitter<AuthState> emit) async{
    emit(const AuthState(status: AuthStatus.loading));
    try {
      final token = await authRepository.setRegistrationToken(
          userId: event.userId,token: event.token);
      if (token == true) {
        emit(const AuthState(status: AuthStatus.changecomplete));
      } else {
        emit(const AuthState(status: AuthStatus.error,
            error: ''));
      }
    } catch (error) {
      emit(const AuthState(
          status: AuthStatus.error, error: ''));
    }
  }
}