import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sma/components/bloc/eventController/AuthEvent.dart';
import 'package:sma/components/validate/AuthValidate.dart';
import 'package:sma/components/bloc/blocController/AuthBloc.dart';
import 'package:sma/components/bloc/stateController/AuthState.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';

class ChangePasswordProvider extends StatefulWidget {
  const ChangePasswordProvider({Key? key}) : super(key: key);

  @override
  State<ChangePasswordProvider> createState() => _ChangePasswordProviderState();
}

class _ChangePasswordProviderState extends State<ChangePasswordProvider> {
  List<FocusNode> focusNodes = List.generate(3, (index) => FocusNode());
  List<TextEditingController> controllers = List.generate(
    3,
    (index) => TextEditingController(),
  );

  bool showFormChange = true;
  bool showConfirm = false;
  List<String> listPassword = ["","",""];
  List<bool> isHidden = [true, true, true];
  List<IconData> iconData = [
    Icons.lock_person_rounded,
    Icons.lock_outline_rounded,
    Icons.lock_reset_rounded
  ];
  List<String> listName = [];
  String validatePassword = '';
  late AuthBloc _authBloc;

  @override
  void initState() {
    // TODO: implement initState
    _authBloc = BlocProvider.of<AuthBloc>(context);
    super.initState();
  }

  @override
  void dispose() {
    for (var node in focusNodes) {
      node.dispose();
    }
    for (var controller in controllers) {
      controller.dispose();
    }
    super.dispose();
  }

  void changePassword() {
    setState(() {
      _authBloc.add(ChangePasswordRequested(
          username: userLoginModelSP.UserName,
          password: listPassword[0],
          newPassword: listPassword[1]));
    });
  }

  @override
  Widget build(BuildContext context) {
    listName = [
      AppLocalizations.of(context).oldPassword,
      AppLocalizations.of(context).newPassword,
      AppLocalizations.of(context).rePassword,
    ];
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        if (showFormChange == true) {
          return formChange();
        } else if (state.status == AuthStatus.unauthenticated) {
          return const LinearProgressIndicator(color: Colors.blue);
        } else if (state.status == AuthStatus.changecomplete) {
          return changePasswordCompleted();
        } else if (state.status == AuthStatus.loading) {
          return const LinearProgressIndicator(color: Colors.blue);
        } else if (state.status == AuthStatus.error) {
          return errorChangePassword();
        } else {
          return const LinearProgressIndicator();
        }
      },
    );
  }

  Widget formChange() {
    return SizedBox(
        width: double.maxFinite,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
                children: List.generate(3, (index) {
              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  obscureText: isHidden[index],
                  controller: controllers[index],
                  focusNode: focusNodes[index],
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14)),
                    hoverColor: Colors.red,
                    prefixIcon: Icon(iconData[index], color: Colors.orange),
                    suffixIcon: IconButton(
                        icon: Icon(isHidden[index]
                            ? Icons.visibility_rounded
                            : Icons.visibility_off_rounded),
                        onPressed: () {
                          setState(() {
                            isHidden[index] = !isHidden[index];
                          });
                        }),
                    labelText: listName[index],
                  ),
                  keyboardType: TextInputType.visiblePassword,
                  onChanged: (text) {
                    setState(() {
                      listPassword[index] = text;
                      validatePassword = passwordValidate(
                          context: context,
                          password: listPassword[0],
                          newPassword: listPassword[1],
                          rePassword: listPassword[2]);
                    });
                  },
                  onSubmitted: (text) {
                    if (index < controllers.length - 1) {
                      FocusScope.of(context)
                          .requestFocus(focusNodes[index + 1]);
                    }
                  },
                ),
              );
            })),
            Container(
              margin: const EdgeInsets.only(bottom: 8, left: 8, right: 8),
              child: Text(
                validatePassword.isEmpty ? '' : validatePassword,
                style: const TextStyle(
                    color: Colors.red, fontWeight: FontWeight.bold),
              ),
            ),
            showConfirm ? confirmChangePassword() : changePasswordButton(listPassword)
          ],
        ));
  }

  Widget changePasswordButton(List<String> listPassword) {
    return ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.redAccent,
        ),
        onPressed: () {
          if (validatePassword.isEmpty && listPassword[0].isNotEmpty) {
            setState(() {
              showConfirm = true;
            });
          }
        },
        child: SizedBox(
            height: 45,
            width: 150,
            child: Center(
                child: Text(AppLocalizations.of(context).changePassword,
                    style:
                        const TextStyle(color: Colors.white, fontSize: 18)))));
  }

  Widget confirmChangePassword() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(AppLocalizations.of(context).changePasswordQuestion,
            style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.red)),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconButton(
                onPressed: () {
                  setState(() {
                    for (int i = 0; i < controllers.length; i++) {
                      controllers[i].text = listPassword[i];
                    }
                    showFormChange = false;
                    changePassword();
                  });
                },
                icon: const Icon(
                  Icons.check_circle_outline,
                  color: Colors.green,
                  size: 35,
                )),
            IconButton(
                onPressed: () {
                  setState(() {
                    showConfirm = false;
                  });
                },
                icon: const Icon(
                  Icons.cancel_outlined,
                  color: Colors.red,
                  size: 35,
                )),
          ],
        )
      ],
    );
  }

  Widget errorChangePassword() {
    return Column(
      children: [
        Text(AppLocalizations.of(context).errorWhenChangePassword,style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.red)),
        const SizedBox(height: 10),
        ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.blue),
            onPressed: () {
              changePassword();
            },
            child: Text(
              AppLocalizations.of(context).again,
              style: const TextStyle(color: Colors.white),
            )),
        const SizedBox(height: 10),
        ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
            onPressed: () {
              setState(() {
                showFormChange = true;
                showConfirm = false;
              });
            },
            child: Text(
              AppLocalizations.of(context).back,
              style: const TextStyle(color: Colors.white),
            )),
      ],
    );
  }
  Widget changePasswordCompleted(){
    return Column(
      children: [
        Text(AppLocalizations.of(context).changePasswordSuccessfully,style: const TextStyle(fontWeight: FontWeight.bold,color: Colors.red)),
        const SizedBox(height: 10),
        ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: Text(
              AppLocalizations.of(context).close,
              style: const TextStyle(color: Colors.white),
            )),
      ],
    );
  }
}
