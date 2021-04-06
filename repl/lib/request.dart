import 'package:http/http.dart' as http;

class LongReplRequest {
  static final String requestUrl = 'https://long-1.pranavbaburaj.repl.co/run';
  String requestBody;

  LongReplRequest(String requestBody) {
    this.requestBody = requestBody;
  }

  Future<dynamic> createReplResult() async {
    var headers = <String, String>{'Content-Type': 'application/json'};
    var response = await http.post(LongReplRequest.requestUrl, headers: headers, body: {
      'code' : requestBody
    });
    
    return response.body;
  }

}