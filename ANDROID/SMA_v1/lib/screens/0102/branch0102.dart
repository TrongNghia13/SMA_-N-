import 'package:flutter/material.dart';
import 'package:sma/components/apiController/branchRepository.dart';
import 'package:sma/components/smaColors.dart';
import 'package:sma/models/branchModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class BranchDropdownButton extends StatefulWidget {
  final String? selectedOption;
  final Function(String?) onChanged;
  final List<branchModel> branches;
  final Function(List<branchModel>) updateBranches; // Callback to update branches

  const BranchDropdownButton({
    required this.selectedOption,
    required this.onChanged,
    required this.branches,
    required this.updateBranches,
  });

  @override
  _BranchDropdownButtonState createState() => _BranchDropdownButtonState();
}

class _BranchDropdownButtonState extends State<BranchDropdownButton> {
  String? _selectedOption;
  bool _isLoading = false; // Track loading state

  @override
  void initState() {
    super.initState();
    _selectedOption = widget.selectedOption;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          AppLocalizations.of(context).branch,
          style: TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 5),
        InkWell(
          onTap: () {
            _showOptions();
          },
          child: InputDecorator(
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0),
                borderSide: BorderSide.none,
              ),
              filled: true,
              fillColor: Colors.white,
              hintText: _selectedOption != null ? '' : AppLocalizations.of(context).branchHint,
              contentPadding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(_selectedOption ?? AppLocalizations.of(context).branchHint),
                //Icon(Icons.arrow_drop_down),
              ],
            ),
          ),
        ),
        SizedBox(height: 20),
      ],
    );
  }

  void _showOptions() {
    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (BuildContext context, setState) {
            return AlertDialog(
              title: Text(
                AppLocalizations.of(context).branch,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: smaColors.bluelogin,
                ),
              ),

              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (_isLoading) CircularProgressIndicator(), // Show loading indicator
                  for (var branch in widget.branches)
                    RadioListTile(
                      title: Text(branch.branchName),
                      value: branch.branchName,
                      groupValue: _selectedOption,
                      activeColor: smaColors.bluelogin,
                      onChanged: (value) {
                        setState(() {
                          _selectedOption = value as String?;
                          widget.onChanged(_selectedOption);
                          Navigator.of(context).pop();
                        });
                      },
                    ),
                ],
              ),
              actions: [
                if (!_isLoading)
                  IconButton(
                    color: smaColors.bluelogin,
                    icon: Icon(Icons.refresh),
                    onPressed: () async {
                      setState(() {
                        _isLoading = true; // Set loading state
                      });
                      await _fetchBranches();
                      setState(() {
                        _isLoading = false; // Reset loading state
                      });
                    },
                  ),
              ],
            );
          },
        );
      },
    );
  }

  Future<void> _fetchBranches() async {
    // Fetch branches from the API
    try {
      final branchRepository = BranchRepository();
      final branches = await branchRepository.fetchBranches();
      widget.updateBranches(branches.toList()); // Update branches in parent widget
      setState(() {
        _selectedOption = null; // Clear selected option after refreshing
      });
    } catch (e) {
      // Handle API error
      print('Error fetching branches: $e');
    }
  }
}
