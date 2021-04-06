import 'dart:io';

import 'request.dart';


void initalizeLongRepl() {
  var userExitedRepl = false;
  while (!userExitedRepl){
    stdout.write('>>> ');
    var input = stdin.readLineSync();
    if(input == '.exit'){
      userExitedRepl = true;
    }

    var outputResponse = LongReplRequest(input.toString()).createReplResult();
    print(outputResponse);
  }
}