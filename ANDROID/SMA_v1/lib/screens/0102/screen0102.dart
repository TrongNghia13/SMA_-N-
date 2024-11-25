import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:simple_circular_progress_bar/simple_circular_progress_bar.dart';
import 'package:sma/components/apiController/branchRepository.dart';
import 'package:sma/screens/0102/branch0102.dart';
import 'package:sma/screens/0102/PasswordField.dart';
import 'package:sma/screens/0102/userName0102.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/components/bloc/stateController/AuthState.dart';
import 'package:sma/components/bloc/eventController/AuthEvent.dart';
import 'package:sma/components/apiController/AuthRepository.dart';
import 'package:sma/components/bloc/blocController/AuthBloc.dart';
import 'package:sma/models/branchModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';

class Screen0102 extends StatelessWidget {
  const Screen0102({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => AuthBloc(authRepository: AuthRepository()),
      child: Login(),
    );
  }
}

class Login extends StatefulWidget {
  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController _userController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final FocusNode _passwordFocusNode = FocusNode();

  String? _selectedOption;
  String? _selectedBranchID; // Holds the selected BranchID
  double _left = 0;
  double _top = -300;
  bool isButtonPressed = false;
  List<branchModel> _branches = []; // List of branchModel from the API
  String registrationToken = '';
  @override
  void initState() {
    super.initState();
    _fetchBranches(); // Fetch branches from the API
    // Disable screen rotation
    getRegistrationToken();
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  }

  // Fetch branches from the API
  Future<void> _fetchBranches() async {
    try {
      final branchRepository = BranchRepository();
      final branches = await branchRepository.fetchBranches();
      setState(() {
        _branches = branches;
      });
    } catch (e) {
      // Handle API error
      print('Error fetching branches: $e');
    }
  }

  Future<String?> getRegistrationToken() async {
    registrationToken = await FirebaseMessaging.instance.getToken() ?? "";
    print("registrationToken $registrationToken");
    return await FirebaseMessaging.instance.getToken();
  }

  @override
  void dispose() {
    // Enable screen rotation
    SystemChrome.setPreferredOrientations(DeviceOrientation.values);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocConsumer<AuthBloc, AuthState>(
        listener: (context, state) async {
          if (state.status == AuthStatus.authenticated) {
            // Handle tasks after successful login, navigate to main screen or perform other actions
            await setUserLoginSP(state.error!);
            context.read<AuthBloc>().add(SetRegistrationTokenRequested(userId: int.parse(userLoginModelSP.UserId), token: registrationToken));
          } else if(state.status == AuthStatus.changecomplete){
            Navigator.of(context).popAndPushNamed(pageRoutes.navigationBar);
          } else if (state.status == AuthStatus.unauthenticated &&
              state.error != null) {
            // Display login error dialog
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                title: Text(AppLocalizations.of(context).notification),
                content:
                    Text(AppLocalizations.of(context).accountOrPasswordError),
                actions: <Widget>[
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text(
                      AppLocalizations.of(context).accept,
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                    style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.green),
                    ),
                  ),
                ],
              ),
            );
          }
        },
        builder: (context, state) {
          if (state.status == AuthStatus.loading) {
            return const Center(
              child: SimpleCircularProgressBar(backStrokeWidth: 0),
            );
          } else {
            return SingleChildScrollView(
              child: Container(
                constraints: BoxConstraints(
                  maxHeight: MediaQuery.of(context).size.height,
                  maxWidth: MediaQuery.of(context).size.width,
                ),
                decoration: BoxDecoration(
                  color: smaColors.bluelogin,
                ),
                child: Column(
                  children: [
                    Expanded(
                      flex: 2,
                      child: Container(),
                    ),
                    Expanded(
                      flex: 5,
                      child: Container(
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: smaColors.blue,
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(40),
                            topRight: Radius.circular(40),
                          ),
                        ),
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            GestureDetector(
                              onPanUpdate: (details) {
                                setState(() {
                                  _left += details.delta.dx;
                                  _top += details.delta.dy;
                                });
                              },
                              child: Transform.translate(
                                offset: Offset(_left, _top),
                                child: Container(
                                  width: 200,
                                  height: 200,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: Colors.white,
                                      width: 4.0,
                                    ),
                                  ),
                                  child: ClipOval(
                                    child: Image.asset(
                                      'assets/images/logo/1.png',
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(24.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  BranchDropdownButton(
                                    branches: _branches,
                                    selectedOption: _selectedOption,
                                    onChanged: (newValue) {
                                      setState(() {
                                        _selectedOption = newValue;
                                        // Find the branch model with the selected branch name
                                        final branchModel =
                                            _branches.firstWhere((branch) =>
                                                branch.branchName ==
                                                _selectedOption);
                                        if (branchModel != null) {
                                          _selectedBranchID =
                                              branchModel.branchID;
                                        }
                                      });
                                    },
                                    updateBranches: (newBranches) {
                                      setState(() {
                                        _branches = newBranches;
                                      });
                                    },
                                  ),
                                  UsernameField(
                                    controller: _userController,
                                    nextFocusNode: _passwordFocusNode,
                                  ),
                                  PasswordField(
                                    controller: _passwordController,
                                    focusNode: _passwordFocusNode,
                                  ),
                                  SizedBox(height: 50),
                                  ElevatedButton(
                                    onPressed: () async {
                                      final username = _userController.text;
                                      final password = _passwordController.text;
                                      // Check for incomplete information
                                      if (username.isEmpty ||
                                          password.isEmpty ||
                                          _selectedBranchID == null ||
                                          password.length < 7) {
                                        // Show an error message
                                        showDialog(
                                          context: context,
                                          builder: (context) => AlertDialog(
                                            title: Text(
                                                AppLocalizations.of(context)
                                                    .notification),
                                            content: Text(
                                                AppLocalizations.of(context)
                                                    .emptyWarning),
                                            actions: <Widget>[
                                              TextButton(
                                                onPressed: () =>
                                                    Navigator.pop(context),
                                                child: Text(
                                                  AppLocalizations.of(context)
                                                      .accept,
                                                  style: TextStyle(
                                                    color: Colors.white,
                                                  ),
                                                ),
                                                style: ButtonStyle(
                                                  backgroundColor:
                                                      MaterialStateProperty.all<
                                                              Color>(
                                                          Colors.deepOrange),
                                                ),
                                              ),
                                            ],
                                          ),
                                        );
                                      } else {
                                        // Dispatch the LoginRequested event
                                        context.read<AuthBloc>().add(
                                            LoginRequested(
                                                UserName: username,
                                                PassWord: password,
                                                BranchID: _selectedBranchID!));
                                      }
                                    },
                                    style: ElevatedButton.styleFrom(
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(10.0),
                                      ),
                                      padding: EdgeInsets.symmetric(
                                          horizontal: 50.0, vertical: 15.0),
                                      backgroundColor: isButtonPressed
                                          ? Colors.red
                                          : Colors.blue,
                                    ),
                                    child: Text(
                                      AppLocalizations.of(context).login,
                                      style: TextStyle(
                                        fontSize: 17,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 20),
                                ],
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              left: 20,
                              right: 20,
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    "SMA-G7 SEP490 SU23-FPTU",
                                    style: TextStyle(
                                      fontSize: 13,
                                      color: Colors.white,
                                    ),
                                  ),
                                  SizedBox(height: 30),
                                  Text(
                                    "Release V1.0",
                                    style: TextStyle(
                                      fontSize: 13,
                                      color: Colors.white,
                                    ),
                                  ),
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
            );
          }
        },
      ),
    );
  }
}
