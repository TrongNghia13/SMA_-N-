import 'package:equatable/equatable.dart';

enum TaskDeliverDetailStateStatus {ready, loading, error, exist, notExist}

class TaskDeliverDetailState extends Equatable {
  final TaskDeliverDetailStateStatus status;
  final String? message;
  final taskDeliverDetail;
  const TaskDeliverDetailState({
    required this.status,
    this.message,
    this.taskDeliverDetail,
  });

  @override
  List<Object?> get props => [status, message,taskDeliverDetail];
}

