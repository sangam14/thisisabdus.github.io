---
layout: post
title: Automated Testing with Mocha — Guide for Testing Javascript Apps
link_post: https://blog.usejournal.com/https-medium-com-thisisabdus-automated-testing-with-mocha-beginners-guide-for-testing-javascript-apps-45aa67dc3352
categories: [ nodejs ]
---
Testing is what everyone should be taking care of while deploying their awesome apps for production. It’s necessary to test applications before deploying as it helps us to ensure that apps met required quality mark and encounter fewer post-production bugs as compared to the applications which ain’t tested before.

I am going to show you the basic and simplest way to start testing your applications using [Mocha](https://mochajs.org/) and [Chai](http://www.chaijs.com/).

> MochaJS is a Javascript testing framework used for testing apps automatically. It can be used in Server-Side Javascript as well as in the browser. ChaiJS is an assertion library for node and just like Mocha, Chai can be used in Server-Side Javascript or in the browser as well. Chai can be paired with any testing framework. Read more about Mocha an Chai.

We would be building a simple program for reversing n string. So, Let’s set-up our working directory. We would be using two npm packages for this mini-project.

Mocha `npm install —save-dev mocha` && Chai `npm install —save-dev chai`

Here, `— save-dev` flag would tell npm to save these dependencies as dev-dependency. In case you don’t know what dev-dependency is, these are the dependencies we only need at the time of development and not in production.

Now, let’s start by creating the `init` file. Open terminal(command prompt, if you are on windows). `cd` to your working directory. Start your project by typing `npm init` inside your working directory.

```sh
$ mkdir testing-application
$ cd testing-application
$ npm init
```

And answer the questions being asked. It will generate a `package.json` file for you.

> QuickTip: Run `npm init -y` to answer yes to all questions.

To keep everything organized, I would recommend you to create a separate directory for all testing scripts. Let’s call it tests. So, `mkdir tests && cd tests`

> By default, Mocha looks for a directory named test. although, you can specify the file path as a command argument while running mocha command.

Since we are inside `tests/` directory, we can create a file inside it and we will call it _strTest.js_ (`touch strTest.js`). Inside this file, our test script will be written. Let’s do it.

Install Mocha and Chai using `npm install mocha chai --save-dev`. --save flag for saving it in package.json file as a dev dependancy.

```javascript
const mocha = require('mocha');     // require mocha
const chai = require('chai');       // require chai 

const expect = chai.expect;

describe('Reverse String Test', () => {
    // Code 
});
```

We are describing what we want to test using `describe()`. It accepts two parameters, a `String` and a callback function. That string can be anything.

```javascript 
const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

describe('Reverse String Test', () => {
    it('Checks if the strings is reversed', () => {
        // Code 
    });
});
```
`it()` used to describe what feature would be tested in that code-block. You are allowed to write nested `describe()` and `it()`.

Now write the function you wanna test. In this case, it would be the function to reverse a string. We will create this file in project root directory and not in the `test/` directory. Call it `strReverse.js`. So, it would be something like this:

```javascript
module.exports = (someString) => {
    let revStr = someString.split('');
    revStr = revStr.reverse().join('');
    return revStr;
};
```

Now `require()` it in `strTest.js` script so that we can use it for testing.

```javascript
const mocha = require('mocha');
const chai = require('chai');

const strReverse = require('../strReverse');   // require strReverse.js script

const expect = chai.expect;

describe('Reverse String Test', () => {
    it('Checks if the strings is reversed', () => {
        // Code 
    });
});
```

Everything’s done! Well, almost. Now we have to write our test cases so that Mocha can test it against different inputs and outputs.

Store few test values in variables. I will be testing it against two values.

```js
let str1 = strReverse('Mocha is cool!!');
let str2 = strReverse('Chai is super supportive.');
```

Here, the use of `expect` variables starts.

```js
expect(str1).to.equal('!!looc si ahcoM');
expect(str2).to.equal('.evitroppus repus si iahC')
```

You can specify as many test cases as you want. So, the complete test script would look similar to this:

```js
const mocha = require('mocha');
const chai = require('chai');

const strReverse = require('../strReverse');   // require strReverse.js script

const expect = chai.expect;

describe('Reverse String Test', () => {
    it('Checks if the strings is reversed', () => {
        let str1 = strReverse('Mocha is cool!!');
        let str2 = strReverse('Chai is super supportive.');

        expect(str1).to.equal('!!looc si ahcoM');
        expect(str2).to.equal('.evitroppus repus si iahC');
    });
});
```

In your `package.json` file, define a new key test(might exist. In that case, edit it’s value) inside `scripts` key and give it’s value, `mocha`.

Now run your test script. `npm test tests/strTest.js`. On passing/failing the tests, mocha send you a detailed summary and error report.

## Result for this test:

```sh
[~/D/t/testing with mocha|3.6.5]
»»»» npm test tests/strTest.js                             0|14:27:26

> mocha-test@1.0.0 test /home/abdus/Documents/test/testing with mocha
> ./node_modules/mocha/bin/mocha "tests/strTest.js"


  Reverse String Test
    ✓ Checks if the strings is reversed


  1 passing (18ms)

[~/D/t/testing with mocha|3.6.5]
»»»»                                                       0|14:27:30
```

That’s all! Go and explore mocha by yourself. Life is too short to keep works pending!

_Originally published in [Medium/@thisisAbdus](https://blog.usejournal.com/https-medium-com-thisisabdus-automated-testing-with-mocha-beginners-guide-for-testing-javascript-apps-45aa67dc3352)_
