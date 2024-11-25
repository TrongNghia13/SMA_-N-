import 'package:equatable/equatable.dart';

abstract class TaskDeliverAppEvent extends Equatable {
  const TaskDeliverAppEvent();
  @override
  List<Object> get props => [];
}

class GetListTaskDeliverAppHandle extends TaskDeliverAppEvent {
  final String username;
  final bool isRoll;
  const GetListTaskDeliverAppHandle({required this.username, required this.isRoll});
  @override
  Object get prop => [username,isRoll];
}
