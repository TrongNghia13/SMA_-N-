import 'package:equatable/equatable.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object> get props => [];
}

class LoginRequested extends AuthEvent {
  final String UserName;
  final String PassWord;
  final String BranchID;
  const LoginRequested({required this.UserName, required this.PassWord, required this.BranchID});

  @override
  List<Object> get props => [UserName, PassWord, BranchID];
}
class ChangePasswordRequested extends AuthEvent {
  final String username;
  final String password;
  final String newPassword;
  const ChangePasswordRequested({required this.username, required this.password,required this.newPassword});

  @override
  Object get prop => [username, password, newPassword];
}
class SetRegistrationTokenRequested extends AuthEvent {
  final int userId;
  final String token;
  const SetRegistrationTokenRequested({required this.userId, required this.token});

  @override
  Object get prop => [userId, token];
}
class LogoutRequested extends AuthEvent {}

