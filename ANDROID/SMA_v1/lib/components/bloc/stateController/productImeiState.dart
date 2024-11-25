import 'package:equatable/equatable.dart';

enum productImeiStateStatus {empty, loading, error, finished, exist, notExist, existListDetail}

class productImeiState extends Equatable {
  final productImeiStateStatus status;
  final String? message;
  final data;
  const productImeiState({
    required this.status,
    this.message,
    this.data

  });

  @override
  List<Object?> get props => [status, message,data];
}

