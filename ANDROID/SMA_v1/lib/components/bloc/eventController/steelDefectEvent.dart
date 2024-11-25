import 'package:equatable/equatable.dart';

abstract class steelDefectEvent extends Equatable {
  const steelDefectEvent();
  @override
  List<Object> get props => [];
}

class cateDefectHandle extends steelDefectEvent {
  final bool isRoll;
  const cateDefectHandle({required this.isRoll});
  @override
  Object get prop => [isRoll];
}

class listDefectProductImeiHandle extends steelDefectEvent {
  final String imei;
  const listDefectProductImeiHandle({required this.imei});
  @override
  Object get prop => [imei];
}