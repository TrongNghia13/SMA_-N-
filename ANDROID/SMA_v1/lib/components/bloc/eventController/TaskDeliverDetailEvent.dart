import 'package:equatable/equatable.dart';
import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/models/ProductOfDeliveryRequest.dart';
abstract class TaskDeliverDetailEvent extends Equatable {
  const TaskDeliverDetailEvent();
  @override
  List<Object> get props => [];
}

class UploadListTaskRequestHandle extends TaskDeliverDetailEvent {
  final TaskDeliverAppModel taskDeliverAppModel;
  final List<ProductOfDeliveryRequest> listProductOfDeliveryRequest;
  const UploadListTaskRequestHandle({required this.taskDeliverAppModel, required this.listProductOfDeliveryRequest});
  @override
  Object get prop => [taskDeliverAppModel,listProductOfDeliveryRequest];
}
