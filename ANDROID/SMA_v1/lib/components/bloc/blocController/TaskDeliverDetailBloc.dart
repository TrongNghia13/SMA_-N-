import 'package:bloc/bloc.dart';
// import 'package:sma/components/apiController/TaskDeliverDetailRepository.dart';
import 'package:sma/components/bloc/eventController/TaskDeliverDetailEvent.dart';
import 'package:sma/components/bloc/stateController/TaskDeliverDetailState.dart';
import 'package:sma/components/apiController/TaskDeliverDetailRepository.dart';

class TaskDeliverDetailBloc extends Bloc<TaskDeliverDetailEvent, TaskDeliverDetailState> {
  final TaskDeliverDetailRepository taskDeliverDetailRepository;

  TaskDeliverDetailBloc({required this.taskDeliverDetailRepository})
      : super(const TaskDeliverDetailState(status: TaskDeliverDetailStateStatus.ready)) {
    on<UploadListTaskRequestHandle>(_handleGetListMenuAppHandle);
  }

  void _handleGetListMenuAppHandle(UploadListTaskRequestHandle event,
      Emitter<TaskDeliverDetailState> emit) async {
    emit(const TaskDeliverDetailState(status: TaskDeliverDetailStateStatus.loading));
    try {
      final data = await taskDeliverDetailRepository.uploadListTaskDeliverDetail(
          taskDeliverAppModel: event.taskDeliverAppModel,productOfDeliveryRequest: event.listProductOfDeliveryRequest);
      if (data == true) {
        emit(TaskDeliverDetailState(
            status: TaskDeliverDetailStateStatus.exist, taskDeliverDetail: data));
      } else {
        emit(const TaskDeliverDetailState(status: TaskDeliverDetailStateStatus.notExist,
            message: 'Dữ liệu không tồn lại'));
      }
    } catch (error) {
      emit(TaskDeliverDetailState(
          status: TaskDeliverDetailStateStatus.error, message: '$error'));
    }
  }

// void _handleLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) {
//   // Xử lý logic đăng xuất ở đây
//   emit(AuthState(status: AuthStatus.unauthenticated));
// }

}