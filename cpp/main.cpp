#include <iostream>

class LongException {
    public:
    std::string exception_message;
    std::string suggestion;
    int line_number;
    std::string file;

    LongException(std::string exception, std::string suggestion, int line, std::string file){
        this->exception_message = exception;
        this->suggestion = suggestion;
        this->line_number = line;
        this->file = file;
    }

    int thow_long_exception(int exit_status, bool fatal){
        std::cout << this->exception_message << std::endl;
        std::cout << this->suggestion << std::endl;
        std::cout << "Error at line " << this->line_number << " in " << this->file;

        if(fatal){
            std::exit(exit_status);
        }

        return exit_status;
    }
}

int parse_command_arguments(const char *args[], int length){
    int argc = length - 1;
    if(argc == 0){
        return 0;
    }
}

int main(int argc, const char *argv[]) {

}