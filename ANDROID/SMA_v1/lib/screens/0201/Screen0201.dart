import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sma/components/apiController/RoleAppRepository.dart';
import 'package:sma/components/bloc/blocController/RoleAppBloc.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:sma/screens/0201/imageSlider_0201.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
import 'ListFunctionBuilder.dart';
class Screen0201 extends StatefulWidget {
  const Screen0201({Key? key}) : super(key: key);

  @override
  State<Screen0201> createState() => _Screen0201State();
}

class _Screen0201State extends State<Screen0201> {
  final RoleAppRepository _roleAppRepository = RoleAppRepository();
  final UserLoginModel _userLoginModel = userLoginModelSP;
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create:(context) => RoleAppBloc(roleAppRepository: _roleAppRepository),
      child: WillPopScope(
        onWillPop:() async {
          return false;
        },
        child: SafeArea(
          child: Scaffold(
            body: Container(
              decoration: BoxDecoration(
                color: smaColors.blueNavigation, // Set the background color here
              ),
              child: Column(
                children: [
                  Expanded(
                    flex: 1,
                    child: Center(
                      child: Text(
                        AppLocalizations.of(context).homePageTitle,
                        style: const TextStyle(
                          fontSize: 24,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 9,
                    child: Container(
                      width: double.infinity,
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topRight: Radius.circular(30),
                          topLeft: Radius.circular(30),
                        ),
                      ),
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        children: [
                          Expanded(
                            flex: 1,
                            child:
                                ImageSlider0201(), // Replace with your actual ImageSlider0201 widget
                          ),
                          // Add spacing between the ImageSlider and the Text
                          Expanded(
                            flex: 2,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                SizedBox(
                                  height: 60,
                                  child: Text(
                                    AppLocalizations.of(context).selectFunction,
                                    style: const TextStyle(
                                      fontSize: 24,
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 2,
                                    child: Center(child: ListFunctionBuilder(userLoginModel: _userLoginModel)),
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
