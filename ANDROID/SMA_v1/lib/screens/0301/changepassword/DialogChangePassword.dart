
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:sma/screens/0301/changepassword/ChangePasswordProvider.dart';
import '../../../components/apiController/AuthRepository.dart';
import '../../../components/bloc/blocController/AuthBloc.dart';
class DialogChangePassword{
  static void showConfirmationDialog({required BuildContext context}) {
    showDialog(
      context: context,
      builder: (BuildContext context) {

        return BlocProvider(
          create: (context) => AuthBloc(authRepository: AuthRepository()),
          child: AlertDialog(
            title: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(AppLocalizations.of(context).changePassword),
                IconButton(onPressed: (){
                  Navigator.of(context).pop();
                }, icon: const Icon(Icons.close,color: Colors.red,))
              ],
            ),
            content: const SingleChildScrollView(
                child: ChangePasswordProvider()),
          ),
        );
      },
    );
  }
}