import 'package:equatable/equatable.dart';

abstract class RoleAppEvent extends Equatable {
  const RoleAppEvent();
  @override
  List<Object> get props => [];
}

class GetListMenuAppHandle extends RoleAppEvent {
  final int userId;
  const GetListMenuAppHandle({required this.userId});
  @override
  Object get prop => [userId];
}
