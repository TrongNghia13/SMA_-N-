import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:sma/components/apiController/OrganizationUnitRepository.dart';
import 'package:sma/components/apiController/employeeRepsitory.dart';
import 'package:sma/components/apiController/jobTitleRepository.dart';
import 'package:sma/components/sharedPreferences/loginSharedPreferences.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/OrganizationUnitModel.dart';
import 'package:sma/models/UserLoginModel.dart';
import 'package:sma/models/jobTitleModel.dart';
import 'package:sma/screens/0301/avatar0301.dart';
import 'package:sma/screens/0301/informationPersonal/appBarInformation.dart';
import 'package:sma/models/employeeModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
class InformationPer extends StatefulWidget {
  const InformationPer({Key? key}) : super(key: key);

  @override
  State<InformationPer> createState() => _InformationPerState();
}

class _InformationPerState extends State<InformationPer> {
  late String employeeTel = '';
  late String employeeEmail = '';
  late String jobTitleName = '';
  late String organizationUnitName = userLoginModelSP.BranchName;

  @override
  void initState() {
    super.initState();
    _fetchEmployeeTel();
    _fetchEmployeeJobTitle();
    _fetchEmployeeOrganizationUnit();
  }
 //-------------------------------------------------------------
  Future<void> _fetchEmployeeTel() async {
    try {
      List<employeeModel> employees = await EmployeeRepository().fetchEmployee();
      UserLoginModel userLoginModel = userLoginModelSP;

      employeeModel employee = employees.firstWhere(
            (emp) => emp.fullName == userLoginModel.EmployeeName,
        orElse: () => employeeModel(
          employeeID: 0,
          organizationUnitID: 0,
          jobTitleID: 0,
        ),
      );

      setState(() {
        employeeTel = employee.employeeTel ?? '';
        employeeEmail = employee.employeeEmail ?? '';
      });
    } catch (e) {
      print('Error fetching employee: $e');
    }
  }
//-------------------------------------------------------------
  Future<void> _fetchEmployeeJobTitle() async {
    try {
      List<employeeModel> employees = await EmployeeRepository().fetchEmployee();
      UserLoginModel userLoginModel = userLoginModelSP;

      employeeModel employee = employees.firstWhere(
            (emp) => emp.fullName == userLoginModel.EmployeeName,
        orElse: () => employeeModel(
          employeeID: 0,
          organizationUnitID: 0,
          jobTitleID: 0,
        ),
      );

      List<jobTitleModel> jobTitles = await JobTilteRepository().fetchEmployee();
      jobTitleModel jobTitle = jobTitles.firstWhere(
            (title) => title.jobTitleID == employee.jobTitleID,
        orElse: () => jobTitleModel(
          jobTitleID: 0,
        ),
      );

      setState(() {
        jobTitleName = jobTitle.jobTitleName ?? '';
      });
    } catch (e) {
      print('Error fetching job title: $e');
    }
  }
  //-------------------------------------------------------------
  Future<void> _fetchEmployeeOrganizationUnit() async {
    try {
      List<employeeModel> employees = await EmployeeRepository().fetchEmployee();
      UserLoginModel userLoginModel = userLoginModelSP;

      employeeModel employee = employees.firstWhere(
            (emp) => emp.fullName == userLoginModel.EmployeeName,
        orElse: () => employeeModel(
          employeeID: 0,
          organizationUnitID: 0,
          jobTitleID: 0,
        ),
      );

      List<organizationUnitModel> organizationUnits = await OrganizationUnitRepository().fetchEmployee();
      organizationUnitModel organizationUnit = organizationUnits.firstWhere(
            (title) => title.organizationUnitID == employee.organizationUnitID,
        orElse: () => organizationUnitModel(
          organizationUnitID: 0,
        ),
      );

      setState(() {
        organizationUnitName = organizationUnit.organizationUnitName ?? '';
      });
    } catch (e) {
      print('Error fetching job title: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBarInformation(),
      body: Column(
        children: [
          Expanded(
            flex: 3,
            child: Avatar0301(),
          ),
          Expanded(
            flex: 8,
            child: Padding(
              padding: const EdgeInsets.all(1.0),
              child: Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          margin: EdgeInsets.only(
                            top: 20,
                            left: 25,
                            right: 25,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(15),
                            boxShadow: [
                              BoxShadow(
                                color: smaColors.grey,
                                spreadRadius: 7,
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(
                                top: 10, bottom: 10, right: 20, left: 20),
                            child: Row(
                              children: [
                                Container(
                                  width: 50,
                                  height: 50,
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(15),
                                  ),
                                  child: Center(
                                    child: Icon(Icons.home_work_outlined),
                                  ),
                                ),
                                SizedBox(
                                  width: 15,
                                ),
                                Expanded(
                                  child: Container(
                                    width: (size.width - 90) * 0.7,
                                    child: Column(
                                      mainAxisAlignment:
                                      MainAxisAlignment.center,
                                      crossAxisAlignment:
                                      CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                        AppLocalizations.of(context).organizationUnit,
                                          style: TextStyle(
                                            fontSize: 15,
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Text(
                                          organizationUnitName,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.black,
                                            fontWeight: FontWeight.w400,
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
                    ],
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          margin: EdgeInsets.only(
                            top: 20,
                            left: 25,
                            right: 25,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(15),
                            boxShadow: [
                              BoxShadow(
                                color: smaColors.grey,
                                spreadRadius: 7,
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(
                                top: 10, bottom: 10, right: 20, left: 20),
                            child: Row(
                              children: [
                                Container(
                                  width: 50,
                                  height: 50,
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(15),
                                  ),
                                  child: Center(
                                    child: Icon(Icons.person_outline),
                                  ),
                                ),
                                SizedBox(
                                  width: 15,
                                ),
                                Expanded(
                                  child: Container(
                                    width: (size.width - 90) * 0.7,
                                    child: Column(
                                      mainAxisAlignment:
                                      MainAxisAlignment.center,
                                      crossAxisAlignment:
                                      CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          AppLocalizations.of(context).jobTitle,
                                          style: TextStyle(
                                            fontSize: 15,
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Text(
                                          jobTitleName,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.black,
                                            fontWeight: FontWeight.w400,
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
                    ],
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          margin: EdgeInsets.only(
                            top: 20,
                            left: 25,
                            right: 25,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(15),
                            boxShadow: [
                              BoxShadow(
                                color: smaColors.grey,
                                spreadRadius: 7,
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(
                                top: 10, bottom: 10, right: 20, left: 20),
                            child: Row(
                              children: [
                                Container(
                                  width: 50,
                                  height: 50,
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(15),
                                  ),
                                  child: Center(
                                    child: Icon(Icons.phone),
                                  ),
                                ),
                                SizedBox(
                                  width: 15,
                                ),
                                Expanded(
                                  child: Container(
                                    width: (size.width - 90) * 0.7,
                                    child: Column(
                                      mainAxisAlignment:
                                      MainAxisAlignment.center,
                                      crossAxisAlignment:
                                      CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          AppLocalizations.of(context).phone,
                                          style: TextStyle(
                                            fontSize: 15,
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Text(
                                          employeeTel,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.black,
                                            fontWeight: FontWeight.w400,
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
                    ],
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          margin: EdgeInsets.only(
                            top: 20,
                            left: 25,
                            right: 25,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(15),
                            boxShadow: [
                              BoxShadow(
                                color: smaColors.grey,
                                spreadRadius: 7,
                                blurRadius: 3,
                              ),
                            ],
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(
                                top: 10, bottom: 10, right: 20, left: 20),
                            child: Row(
                              children: [
                                Container(
                                  width: 50,
                                  height: 50,
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(15),
                                  ),
                                  child: Center(
                                    child: Icon(Icons.email_outlined),
                                  ),
                                ),
                                SizedBox(
                                  width: 15,
                                ),
                                Expanded(
                                  child: Container(
                                    width: (size.width - 90) * 0.7,
                                    child: Column(
                                      mainAxisAlignment:
                                      MainAxisAlignment.center,
                                      crossAxisAlignment:
                                      CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          "Email",
                                          style: TextStyle(
                                            fontSize: 15,
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Text(
                                          employeeEmail,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.black,
                                            fontWeight: FontWeight.w400,
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
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
