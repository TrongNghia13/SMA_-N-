import 'package:equatable/equatable.dart';

enum AuthStatus { authenticated, unauthenticated, loading, error, changecomplete }

class AuthState extends Equatable {
  final AuthStatus status;
  final String? error;


  const AuthState({
    required this.status,
    this.error,
  });

  @override
  List<Object?> get props => [status, error];

  get branches => null;
}

