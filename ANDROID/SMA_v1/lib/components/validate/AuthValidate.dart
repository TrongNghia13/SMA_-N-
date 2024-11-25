import 'package:flutter/cupertino.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
String passwordValidate({required BuildContext context,required String password,String newPassword ='12345678', String rePassword='12345678'}){
  if(password.length < 8){
    return AppLocalizations.of(context).lengthPasswordError;
  } else if(newPassword.isEmpty){
    return AppLocalizations.of(context).emptyNewPassword;
  } else if ( newPassword.length < 8 ){
    return AppLocalizations.of(context).lengthPasswordError;
  } else if(password == newPassword){
    return AppLocalizations.of(context).newPasswordNotEqualPassword;
  } else if(rePassword.isEmpty){
    return AppLocalizations.of(context).emptyRePassword;
  } else if( rePassword.length < 8){
    return AppLocalizations.of(context).lengthPasswordError;
  }else if(newPassword != rePassword){
    return AppLocalizations.of(context).rePasswordMustHaveDuplicate;
  }
  else {
    return '';
  }
}