import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sma/components/apiController/TaskDeliverAppRepository.dart';
import 'package:sma/components/bloc/blocController/TaskDeliverAppBloc.dart';
import 'package:sma/components/pageRoutes.dart';
import 'package:sma/fake_data/fakeDeliveryRequest.dart';
import 'package:sma/screens/0401/ListTaskRequestBuilder.dart';
import 'AppBar0401.dart';


class Screen0401 extends StatefulWidget {
  static const String routeName = pageRoutes.checkDeliveryRequest0401;
  late bool isRoll;
  Screen0401({super.key});

  @override
  State<Screen0401> createState() => _Screen0401State();
}

class _Screen0401State extends State<Screen0401> {
  final TaskDeliverAppRepository _taskDeliverAppRepository  = TaskDeliverAppRepository();


  @override
  Widget build(BuildContext context) {
    setState(() {
      widget.isRoll = ModalRoute.of(context)?.settings.arguments as bool;
    });
    return Scaffold(
      appBar: AppBar0401(isRoll: widget.isRoll),
      body: WillPopScope(
          onWillPop: () async {
            Navigator.of(context).popAndPushNamed(pageRoutes.navigationBar);
            return false;
          },
        child: BlocProvider(
          create: (context) => TaskDeliverAppBloc(taskDeliverAppRepository: _taskDeliverAppRepository),
          child:  ListTaskRequestBuilder(isRoll: widget.isRoll),
        ),
      ),
    );
  }
}


