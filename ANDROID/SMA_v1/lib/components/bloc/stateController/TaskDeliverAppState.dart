import 'package:equatable/equatable.dart';

enum TaskDeliverAppStateStatus {ready, loading, error, exist, notExist}

class TaskDeliverAppState extends Equatable {
  final TaskDeliverAppStateStatus status;
  final String? message;
  final taskDeliverAppList;
  const TaskDeliverAppState({
    required this.status,
    this.message,
    this.taskDeliverAppList,
  });

  @override
  List<Object?> get props => [status, message,taskDeliverAppList];
}

