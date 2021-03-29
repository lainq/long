Have you ever thought of creating a programming language just for fun? Yes, I made an attempt to create my own Esoteric Programming Language based on ASCII characters.

## What is an esoteric language?
Esoteric programming languages are weird languages created just for fun rather than for practical use.

Some examples include Befunge
```
 "dlroW olleH">:v
              ^,_@
```
LOLCODE
```
HAI
CAN HAS STDIO?
VISIBLE "HAI WORLD!"
KTHXBYE
```
and Shakespeare
```
Act I: Hamlet's insults and flattery.
```

<hr>

## Long
Long is a simple,  useless, minimal esoteric programming language created for fun. The language is based on `ASCII` characters. You can find the code in [GitHub](https://github.com/pranavbaburaj/long)
```brainfuck
72+#29+#7+##3+#79-# 55+#24+#3+#6-#8-#68-#1+# ;
```

<hr>

## How long works ??
The long programming language works like this:

- Takes the file to run
- The lexer breaks down the code into specific tokens and store them in an array
- The tokens are grouped into different commands.
- The commands are executed 

<hr>

## How to use it??
Using long is pretty simple. You just have to create a project and run it.

To create a project, run 
```
long new
```
and answer all the prompts and you are ready to go. To run the project, get into the project directory and run `long run`(Make sure you have the right file mentioned in the `entry-point` field in the `long.json` file). Or, you can directly mention the file name like this,

```
long <path-to-file>
```


The language works based on the value which is incremented and decremented

The main commands in the language are the following,
`#` for printing the current character
`!` for setting the value to 0
`+`, `-`, `*`, `/` for arithmetic operations

Arithmetic operations can be performed on the value which is initially set to 0. You can print out the current value converted to a character with the print command(`#`).

For example:
```brainfuck
72+# 33+# ;
```
Result:
```
Hi
```
This piece of code will increase the value by 72 and print the value out. Again, the value is incremented by 33 and printed out.

<hr>

### Feel free to contribute on [GitHub](https://github.com/pranavbaburaj/long)

<hr>

To reach me just ping me on [Discord](https://discord.com/users/763820556491161650) and also, don't forget to join my [Discord server](https://discord.gg/vzcNRVrHR5).

Hope you got something new today. Thank you for scrolling and have a nice day.
