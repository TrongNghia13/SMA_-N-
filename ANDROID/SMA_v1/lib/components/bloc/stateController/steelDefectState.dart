import 'package:equatable/equatable.dart';

enum steelDefectStateStatus {empty, loading, error, exist, loadingListDefectByProductImei, existListDefectByProductImei, errorListDefectByProductImei}

class steelDefectState extends Equatable {
  final steelDefectStateStatus status;
  final String? message;
  final defectList;
  final productImeiDefectList;
  const steelDefectState({
    required this.status,
    this.message,
    this.defectList,
    this.productImeiDefectList
  });

  @override
  List<Object?> get props => [status, message,defectList,productImeiDefectList];
}

