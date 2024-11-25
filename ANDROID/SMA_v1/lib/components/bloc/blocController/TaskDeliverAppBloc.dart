import 'package:bloc/bloc.dart';
import 'package:sma/components/apiController/TaskDeliverAppRepository.dart';
import 'package:sma/components/bloc/eventController/TaskDeliverAppEvent.dart';
import 'package:sma/components/bloc/stateController/TaskDeliverAppState.dart';


class TaskDeliverAppBloc extends Bloc<TaskDeliverAppEvent, TaskDeliverAppState> {
  final TaskDeliverAppRepository taskDeliverAppRepository;

  TaskDeliverAppBloc({required this.taskDeliverAppRepository})
      : super(const TaskDeliverAppState(status: TaskDeliverAppStateStatus.ready)) {
    on<GetListTaskDeliverAppHandle>(_handleGetListMenuAppHandle);
  }

  void _handleGetListMenuAppHandle(GetListTaskDeliverAppHandle event,
      Emitter<TaskDeliverAppState> emit) async {
    emit(const TaskDeliverAppState(status: TaskDeliverAppStateStatus.loading));
    try {
      final data = await taskDeliverAppRepository.getListTaskDeliverAppByUsername(
          username: event.username,isRoll: event.isRoll);
      if (data != null) {
        emit(TaskDeliverAppState(
            status: TaskDeliverAppStateStatus.exist, taskDeliverAppList: data));
      } else {
        emit(const TaskDeliverAppState(status: TaskDeliverAppStateStatus.notExist,
            message: 'Dữ liệu không tồn lại'));
      }
    } catch (error) {
      emit(TaskDeliverAppState(
          status: TaskDeliverAppStateStatus.error, message: '$error'));
    }
  }

// void _handleLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) {
//   // Xử lý logic đăng xuất ở đây
//   emit(AuthState(status: AuthStatus.unauthenticated));
// }

}