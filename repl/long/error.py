from clint.textui import colored

class LongReplException(object):
    def __init__(self, exception_message, suggestion, error_type):
        self.exception_message = exception_message
        self.suggestion = suggestion

        self.error_type = error_type

    def evoke_repl_exception(self):
        stdout_message = [
            colored.red(f"[{self.error_type}] {self.exception_message}"),
            colored.green(f"[Suggestion] {self.suggestion}")
        ]
        for stdout_message_index in range(len(stdout_message)):
            message = stdout_message[stdout_message_index]
    
    def __len__(self):
        return len(self.exception_message)

    def __repr__(self):
        return self.exception_message

    def __str__(self):
        return self.exception_message