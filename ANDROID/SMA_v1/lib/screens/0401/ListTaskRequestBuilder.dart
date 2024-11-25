import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sma/components/bloc/blocController/TaskDeliverAppBloc.dart';
import 'package:sma/components/bloc/stateController/TaskDeliverAppState.dart';
import 'DeliveryRequestListView0401.dart';
import 'package:sma/models/TaskDeliverAppModel.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'DeliveryRequestListItemEmptyView0401.dart';
import 'package:sma/components/widgets/searchBarWidget.dart';
import 'package:sma/components/localStore.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sma/components/bloc/eventController/TaskDeliverAppEvent.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class ListTaskRequestBuilder extends StatefulWidget {
  final bool isRoll;
  const ListTaskRequestBuilder({Key? key, required this.isRoll}) : super(key: key);

  @override
  State<ListTaskRequestBuilder> createState() => _ListTaskRequestBuilderState();
}

class _ListTaskRequestBuilderState extends State<ListTaskRequestBuilder> {
  final UserLoginModel _userLoginModel = userLoginModelSP;
  late final TaskDeliverAppBloc _taskDeliverAppBloc;
  List<TaskDeliverAppModel> deliveryRequestList = [];
  // fakeDeliveryRequest.cast<TaskDeliverAppModel>(); // đặt dữ liệu api tên là deliveryRequestList
  List<TaskDeliverAppModel> searchedDeliveryRequestList =
      []; // tạo 1 danh sách đã tìm kiếm để lưu dữ liệu
  bool isSearched =
      false; // check xem người dùng đã search hay chưa, mặc định là chưa bấm vào

  @override
  void initState() {
    // đặt dữ liệu ban đầu khi mới vào màn hình

    initSharedPreferences();
    _taskDeliverAppBloc = BlocProvider.of<TaskDeliverAppBloc>(context);

    super.initState();
  }

  void initSharedPreferences() async {
    localStore.prefs = await SharedPreferences.getInstance();
  }

  void loadDataMenuApp() {
    _taskDeliverAppBloc.add(GetListTaskDeliverAppHandle(username: _userLoginModel.UserName,isRoll: widget.isRoll));
  }

  void searchKeyword(String keyword) {
    // hàm khi người dùng điền từ khoá search vào
    isSearched = true; // set trạng thái người dùng đã điền chữ vào search box
    setState(() {
      // setState lại màn hình ( refesh )
      if (keyword == null) {
        // nếu người dùng ko search gì thì hiển thị tất cả
        searchedDeliveryRequestList = deliveryRequestList;
      }
      searchedDeliveryRequestList = deliveryRequestList
          .where((item) => item.productionPlanID
              .toLowerCase()
              .contains(keyword.toLowerCase()))
          .toList(); // ngược lại nếu search thì search theo từ khoá
    });
  }
  Future<void> _refreshData() async {
    // Simulate fetching new data or refreshing existing data.
    await Future.delayed(Duration(seconds: 2));
    loadDataMenuApp();
  }
  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _refreshData,
      child: BlocConsumer<TaskDeliverAppBloc, TaskDeliverAppState> (
        listener: (context, state) {

        },builder: (context, state) {
          if(state.status == TaskDeliverAppStateStatus.ready){
            loadDataMenuApp();
            return onLoadingListTaskApp(AppLocalizations.of(context).serverConnecting);
          }else if(state.status == TaskDeliverAppStateStatus.loading){
            deliveryRequestList=[];
            searchedDeliveryRequestList=[];
            return onLoadingListTaskApp(AppLocalizations.of(context).loading);

          }else if(state.status == TaskDeliverAppStateStatus.notExist){
            return onLoadingListTaskApp(AppLocalizations.of(context).messageErrorApi);

          }else if(state.status == TaskDeliverAppStateStatus.error){
            return onLoadingListTaskApp(AppLocalizations.of(context).serverErrorConnecting);
          }else {
            if(deliveryRequestList.isEmpty){
              deliveryRequestList = state.taskDeliverAppList;
              if(searchedDeliveryRequestList !=null){
                searchedDeliveryRequestList // gáng list đã search bằng dữ liệu ban đầu
                    .addAll(deliveryRequestList); // nếu
              }
            }
            return checkNullAPI(searchedDeliveryRequestList, searchKeyword, isSearched);
          }
        },
      ),
    );
  }
  Widget onLoadingListTaskApp(String text){
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircularProgressIndicator(color: Colors.blue),
          Text(text)
        ],
      ),
    );
  }

  Widget checkNullAPI(List<TaskDeliverAppModel>? listDeliveryRequest,
      void Function(String value) searchKeyword, bool isSearch) {
    if (listDeliveryRequest!.isEmpty && isSearch == false) {
      // nếu list rỗng do ko có dữ liệu
      //check nếu list dữ liệu rỗng
      return SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            searchBarWidget(isEnable: false,onSearchChanged: searchKeyword),
            const DeliveryRequestListItemEmptyView0401()
            // trả về widget rỗng
          ],
        ),
      );
    } else if (listDeliveryRequest!.isEmpty && isSearch == true) {
      // nếu list rỗng do search ko có dữ liệu
      return Column(
        children: [
          searchBarWidget(isEnable: true, onSearchChanged: searchKeyword),
          Text(AppLocalizations.of(context).notFoundPlanId)
          // ngược lại hiện gridview // widget Check null chuyển widget
        ],
      );
    } else {
      // các trường hợp còn lại
      return Column(
        children: [
          searchBarWidget(isEnable: true, onSearchChanged: searchKeyword),
          DeliveryRequestListView0401(deliveryRequestList: listDeliveryRequest, isRoll: widget.isRoll,)
          // ngược lại hiện gridview
        ],
      );
    }
  }

}
