import 'package:equatable/equatable.dart';

enum RoleAppStateStatus {ready, loading, error, exist, notExist}

class RoleAppState extends Equatable {
  final RoleAppStateStatus status;
  final String? message;
  final menuAppList;
  const RoleAppState({
    required this.status,
    this.message,
    this.menuAppList,
  });

  @override
  List<Object?> get props => [status, message,menuAppList];
}

