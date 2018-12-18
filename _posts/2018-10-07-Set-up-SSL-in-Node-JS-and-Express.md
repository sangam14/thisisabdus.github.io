---
layout: post
title: Set-up SSL in Node JS and Express using openSSL
tags: [SSL, Express, NodeJS, HTTPs]
categories: [nodejs, server-side]
---

This a simple, easy-to-follow tutorial on how to serve pages over _https_ in _Node JS_ using _Express_ Framework. 

Tools/Frameworks we would be using for this tutorial, are:
- **Node JS**: You should've basic knowledge on how to programm in [Node JS](https://nodejs.org/)
- **OpenSSL**: A tool to generate key and certificate.
- **Express JS** (`npm i express`): Back-end framework for writing servers in Node JS. More about [Express](https://expressjs.com/)
- **`https`**: Comes with Node JS

Let's setup our project directory. It's not a directory with lots of files. Instead, it contains only 4 files which are `package.json`, `key.pem`, `cert.pem` and `server.js`. So, create a new directory _node-https_, `cd node-https` and run `npm init -y` to create `package.json` file. 

Now install _express_ using `npm i --save express`. Create a `server.js` file and type the following code in it.

Our `server.js` should look like this: 

```js
const app = require('express')();
const http = require('https');
const fs = require('fs');

//GET home route
app.get('/', (req, res) => {
     res.send('Hello World');
});

// we will pass our 'app' to 'https' server
https.createServer(app).listen(3000);
```

That's it. Now if you run `node server.js` and visit `localhost:3000` you won't see anything but an error! It's time to fix that error.

## Generate cert.pem and key.pem
Using `openssl`([?](https://www.openssl.org/)), we will generate our `key` and `cert`. So, here's how you can do this: 

```sh
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

- `-keyout`: This flag let openssl know where to save _key.pem_ file. I can be an absolute file location.
- `-out`: This flag let openssl know where to save _cert.pem_ file. I can be an absolute file location as well.
- `-days`: This flag specify the number of days the SSL will be valid. 

Make sure to run above command inside the directory where `server.js` is present. follow all the steps showing in terminal. If all went well, you should see two new files in your project root, i.e. `cert.pem` and `key.pem`.

Open `server.js` and include cert and key file in your `https.createServer()` function. Just like the below example.

```js
const app = require('express')();
const http = require('https');
const fs = require('fs');

//GET home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'YOUR PASSPHRASE HERE'
}, app)
.listen(3000);
```

Open terninal window and run `node server.js`. It should run without any error. Open browser and visit `https://localhost:3000` and you should see **Hello World**.

You may see some SSL warning. That's because your certificate didn't issued by any verified organisations. What you want to do is, add the cert as an exception to your browser.

If you are facing any trouble setting up SSL, message me on [twitter/@thisisAbdus](https://twitter.com/thisisabdus) or email me at [dev.abdus@gmail.com](mailto:dev.abdus@gmail.com)
