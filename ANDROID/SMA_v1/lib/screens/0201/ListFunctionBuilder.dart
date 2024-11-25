import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:simple_circular_progress_bar/simple_circular_progress_bar.dart';
import 'package:sma/components/bloc/blocController/RoleAppBloc.dart';
import 'package:sma/components/bloc/stateController/RoleAppState.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:sma/models/MenuAppModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/components/bloc/eventController/RoleAppEvent.dart';

class ListFunctionBuilder extends StatefulWidget {
  final UserLoginModel? userLoginModel;
  const ListFunctionBuilder({super.key, required this.userLoginModel});

  @override
  State<ListFunctionBuilder> createState() => _ListFunctionBuilderState();
}

class _ListFunctionBuilderState extends State<ListFunctionBuilder> {
  late final RoleAppBloc _roleAppBloc;
  List<MenuAppModel> menuAppList =[];
  @override
  void initState() {
    // TODO: implement initState
    _roleAppBloc = BlocProvider.of<RoleAppBloc>(context);
    super.initState();
  }

  Future<void> loadDataMenuApp(String userId) async{
    await Future.delayed(const Duration(seconds: 1));
    int userIdInterger = 0;
    try {
      userIdInterger = int.parse(userId);
    } catch (ex) {}
    _roleAppBloc.add(GetListMenuAppHandle(userId: userIdInterger));
  }

  Future<void> _refreshData() async {
    // Simulate fetching new data or refreshing existing data.
    await Future.delayed(Duration(seconds: 1));
    setState(() {
      loadDataMenuApp(widget.userLoginModel!.UserId);
    });
  }
  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _refreshData,
      child: BlocBuilder<RoleAppBloc, RoleAppState>(
        builder: (context, state) {
          if (state.status == RoleAppStateStatus.ready) {

            loadDataMenuApp(widget.userLoginModel!.UserId);
            return onLoadingFunctionMenu(AppLocalizations.of(context).serverConnecting);
          } else if (state.status == RoleAppStateStatus.loading) {
            menuAppList = [];
            return onLoadingFunctionMenu(AppLocalizations.of(context).loading);
          } else if (state.status == RoleAppStateStatus.notExist) {
            return onLoadingFunctionMenu(AppLocalizations.of(context).loading);
          } else {
            // Hàm để thêm widget dựa vào widgetKey
            final Map<String, Widget Function()> widgetMap = {
              'function1': () => itemFunction(
                  icon: Icons.qr_code,
                  name: AppLocalizations.of(context).function1Name,
                  navigation: () => Navigator.of(context)
                      .popAndPushNamed(pageRoutes.checkDeliveryRequest0401, arguments: true)),
              'function2': () => itemFunction(
                  icon: Icons.photo_camera_sharp,
                  name: AppLocalizations.of(context).function2Name,
                  navigation: () => Navigator.of(context)
                      .popAndPushNamed(pageRoutes.captureRollDefect0501, arguments: true)),
              'function3': () => itemFunction(
                  icon: Icons.qr_code_2,
                  name: AppLocalizations.of(context).function3Name,
                  navigation: () => Navigator.of(context)
                      .popAndPushNamed(pageRoutes.checkDeliveryRequest0401, arguments: false)),
              'function4': () => itemFunction(
                  icon: Icons.camera_alt_outlined,
                  name: AppLocalizations.of(context).function4Name,
                  navigation: () => Navigator.of(context)
                      .popAndPushNamed(pageRoutes.captureRollDefect0501, arguments: false)),
              'function5': () => itemFunction(
                  icon: Icons.search_outlined,
                  name: AppLocalizations.of(context).function5Name,
                  navigation: () => Navigator.of(context)
                      .popAndPushNamed(pageRoutes.lookUp0601)),
              'function6': () => itemFunction(
                  icon: Icons.sticky_note_2,
                  name: AppLocalizations.of(context).function6Name,
                  navigation: () => Navigator.of(context)
                      .popAndPushNamed(pageRoutes.statistical0701)),
            };
            Widget buildWidget(MenuAppModel menuAppModel) {
              return widgetMap.containsKey(menuAppModel.menuAppKey)
                  ? widgetMap[menuAppModel.menuAppKey]!()
                  : itemFunction(
                      icon: Icons.warning_amber,
                      name: menuAppModel.menuAppName ?? '',
                      navigation: () => ''); // Hoặc widget mặc định nếu không tìm thấy key trong cơ sở dữ liệu
            }
            if(menuAppList.isEmpty){
              if(state.menuAppList!=null){
                menuAppList = state.menuAppList;
              }
            }
            // List<Widget> listFunction = [];
            // listFunction.add(itemFunction(icon: Icons.qr_code, name: AppLocalizations.of(context).function1Name, navigation:  () => Navigator.of(context).popAndPushNamed(pageRoutes.checkDeliveryRequest0401)));
            // listFunction.add(itemFunction(icon: Icons.photo_camera_sharp, name: AppLocalizations.of(context).function2Name, navigation:  () => Navigator.of(context).popAndPushNamed(pageRoutes.captureRollDefect0501)));
            // //listFunction.add(itemFunction(icon: Icons.qr_code, name: AppLocalizations.of(context).function3Name, navigation:  () => Navigator.of(context).popAndPushNamed(pageRoutes.checkDeliveryRequest0401)));
            // //listFunction.add(itemFunction(icon: Icons.photo_camera_sharp, name: AppLocalizations.of(context).function4Name, navigation:  () => Navigator.of(context).popAndPushNamed(pageRoutes.checkDeliveryRequest0401)));
            // listFunction.add(itemFunction(icon: Icons.search_outlined, name: AppLocalizations.of(context).function5Name, navigation:  () => Navigator.of(context).popAndPushNamed(pageRoutes.captureRollDefect0501)));
            // listFunction.add(itemFunction(icon: Icons.sticky_note_2, name: AppLocalizations.of(context).function6Name, navigation:  () => Navigator.of(context).popAndPushNamed(pageRoutes.captureRollDefect0501)));
            if (menuAppList.isEmpty) {
              return GridView(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 1
                ),
                children: [
                  Column(
                    children: [
                      const Expanded(
                          flex: 1,
                          child: Icon(
                            Icons.error_outline,
                            color: Colors.red,
                            size: 75,
                          )),
                      Expanded(
                          flex: 2,
                          child: Text(
                            AppLocalizations.of(context).roleAppEmptyNotification,
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontWeight: FontWeight.bold,color: Colors.red),
                          )),
                    ],
                  ),
                ],
              );
            } else {
              return GridView.builder(
                gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                  mainAxisExtent:  menuAppList.length > 4 ? 105 : null,
                    maxCrossAxisExtent: 230,
                    crossAxisSpacing: 15.0,
                    mainAxisSpacing: 15.0,
                    childAspectRatio: 1),
                itemCount: menuAppList.length,
                itemBuilder: (context, index) {
                  return buildWidget(menuAppList[index]);
                },
              );
            }
            //----------------------//
          }
        },
      ),
    );
  }

  Widget itemFunction({
    required IconData icon,
    required String name,
    required VoidCallback
        navigation, // Sử dụng VoidCallback thay vì Future<Object?>
  }) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(13), color: smaColors.blueLight),
      child: MaterialButton(
        splashColor: smaColors.blue,
        onPressed: navigation,
        child: Transform.scale(
          scale: 0.8, // Tùy chỉnh tỷ lệ kích thước theo nhu cầu của bạn
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: menuAppList.length > 4 ? 35 : 70, color: Colors.white),
              // Tùy chỉnh kích thước của Icon theo nhu cầu của bạn
              SizedBox(height:menuAppList.length > 4 ? 0 : 15),
              // Khoảng cách giữa Icon và Text
              Text("$name",
                  style: GoogleFonts.lato(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: menuAppList.length > 4 ? 16 : 19),
                  textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }

  Widget onLoadingFunctionMenu(String text){
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
         const SimpleCircularProgressBar(
        backStrokeWidth: 0,
      ),
          const SizedBox(height: 20,),
          Text(text)
        ],
      ),
    );
  }
}
