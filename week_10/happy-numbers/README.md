# Happy Numbers

A happy number is defined by the following process:

- Starting with any positive integer,
- replace the number by the _sum of the squares of its digits_, and
- repeat the process until
-  the number equals 1 (where it will stay),
- or it loops endlessly in a *repeating* cycle which does not include 1.   

Those numbers for which this process ends in 1 are happy numbers,
while those for which this process do not end in 1 are unhappy numbers.


## Task

Your task is to write a program in Javascript which prints the first 10 happy numbers, starting from 1.

Here are the first 10 happy numbers, for you to compare your output against:

```
1
7
10
13
19
23
28
31
32
44
```

### Hints
- Now that you have node.js installed on your computer, you don't need to run any of this in the browser. Just run `node myprogname.js` from your terminal.
- You __do not__ need to be able to somehow tell if your code will "loop endlessly" (this is impossible in principle and is known in the philosophy of computer science as the [Halting Problem](https://en.wikipedia.org/wiki/Halting_problem)). All you need to do is detect if the numerical process described above ever repeats itself... i.e. keep track of the numbers you've already generated in your calculations...
