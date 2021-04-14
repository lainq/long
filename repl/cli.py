from clint.textui import colored
import sys as process
import json as json
import requests as requests


class LongReplException(object):
    def __init__(self, exception_message, suggestion, error_type):
        self.exception_message = exception_message
        self.suggestion = suggestion

        self.error_type = error_type
        self.evoke_repl_exception()

    def evoke_repl_exception(self):
        stdout_message = [
            colored.red(f"[{self.error_type}] {self.exception_message}"),
            colored.green(f"[Suggestion] {self.suggestion}")
        ]
        for stdout_message_index in range(len(stdout_message)):
            message = stdout_message[stdout_message_index]
            print(message)

    def __len__(self):
        return len(self.exception_message)

    def __repr__(self):
        return self.exception_message

    def __str__(self):
        return self.exception_message


def prompt(prompt_message=">"):
    print(colored.cyan(f"{prompt_message} "), end='')
    try:
        input_data = str(input())
    except KeyboardInterrupt:
        exception = LongReplException("Your keyboard interrupted",
                                      "Restart the repl", "KeyBoardInterrupt")
        process.exit()

    return input_data


def execute_code_snippet(code_snippet):
    request_body = json.dumps({"code": code_snippet})
    request_url = 'https://long-1.pranavbaburaj.repl.co/run'
    try:
        response = requests.request(
            'POST',
            request_url,
            data=request_body,
            headers={'Content-Type': 'application/json'})
        response_data = json.loads(response.content.decode("utf-8"))
        if "stdout" in response_data:
            for stdout_element_index in range(len(response_data["stdout"])):
                stdout_element = response_data["stdout"][stdout_element_index]
                print(colored.green(stdout_element), end='')

            if len(response_data["stdout"]) != 0:
                print("")

    except Exception as exception_message:
        error = LongReplException("An unknown error occured", "Try again",
                                  "UnknownError")
        process.exit()


def initialize_long_cli():
    user_exists_repl = False
    while not user_exists_repl:
        code_input = prompt()

        if code_input == ".exit":
            user_exists_repl = True
        execute_code_snippet(code_input)


if __name__ == "__main__":
    initialize_long_cli()