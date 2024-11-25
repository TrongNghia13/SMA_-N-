import 'package:flutter/material.dart';
class DropDownMenu extends StatefulWidget {
  Widget title;
  Widget widgetDropDown;
  bool isEdit;
  bool isContentVisible;
  Function(List<bool>) isOpen;
  int indexColumn;
  List<bool> listIsShow;

  DropDownMenu(
      {super.key,
        required this.title,
        required this.widgetDropDown,
        required this.isContentVisible,
        required this.isOpen,
        required this.indexColumn,
        required this.listIsShow,
        required this.isEdit});

  @override
  State<DropDownMenu> createState() => _DropDownMenuState();
}

class _DropDownMenuState extends State<DropDownMenu> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ListTile(
          title: Row(
            children: [
              widget.title,
              Icon(widget.isEdit ? Icons.edit_rounded : Icons.edit_off_sharp)
            ],
          ),
          trailing: Icon(widget.isContentVisible
              ? Icons.arrow_drop_down
              : Icons.arrow_drop_up),
          onTap: () {
            setState(() {
              widget.isContentVisible = !widget.isContentVisible;
              widget.listIsShow[widget.indexColumn] = widget.isContentVisible;
              widget.isOpen(widget.listIsShow);
            });
          },
        ),
        if (widget.isContentVisible) widget.widgetDropDown
      ],
    );
  }
}