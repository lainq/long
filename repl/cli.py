import sys as sys

def initialize_long_cli():
    arguments = sys.argv[1:len(sys.argv)]
    print(arguments)

if __name__ == "__main__":
    initialize_long_cli()