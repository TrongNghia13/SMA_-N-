import 'package:flutter/material.dart';
import 'package:sma/components/apiController/employeeRepsitory.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:sma/models/employeeModel.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class Avatar0301 extends StatelessWidget {
  const Avatar0301({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<List<employeeModel>>(
        future: EmployeeRepository().fetchEmployee(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Waiting for data from the API
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            // Handling error if there's any
            return Center(
              child: Text(AppLocalizations.of(context).serverErrorConnecting),
            );
          } else {
            UserLoginModel userLoginModel = userLoginModelSP;
            final List<employeeModel> employees = snapshot.data ?? [];
             final String  fullName = userLoginModel.EmployeeName;

            return Center(
              child: Column(
                children: [
                  const SizedBox(height: 20),
                  const CircleAvatar(
                    backgroundImage: AssetImage('assets/images/logo/1.png'),
                    radius: 50,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    fullName,
                    style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.bold,
                      color: smaColors.blue,
                    ),
                  ),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}