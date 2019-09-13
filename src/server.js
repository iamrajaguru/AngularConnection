const mongoose = require('mongoose');
const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
const cors = require('cors');
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
// var MyP="@";
app.use(bodyParser.json());
var corsObject = {
  origin: 'http://localhost:4200',
  optionSuccessState: 200,
};
app.use(cors(corsObject));
const signup = mongoose.model('signup', {
  username: String,
  email: String,
  password: String,
});
// var Ps=(2+""+2*3+""+3*3+""+7);
// Ps=Ps+MyP+"ODS";
mongoose.connect('mongodb://localhost:27017/Authentication', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3000, () => {
  console.log('====================================');
  console.log('Server Connected');
  console.log('====================================');
});

//SignupCall Or RegisterCall
app.post('/signup', (req, res) => {
  console.log(req.body);
  var signupObject = new signup();
  signupObject.username = req.body.username;
  signupObject.email = req.body.email;
  signupObject.password = req.body.password;

  res.status(200).json(signupObject);

  // jwt.verify(token, signupObject.username, function (err, decoded) {
  //     console.log("Decoded"+decoded.email)
  // });
  signupObject.save(err => {
    console.log('====================================');
    console.log(signupObject);
    console.log('====================================');
  });
});

//SendingMail
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'rajaguru@onedatasoftware.com',
//         pass: Ps
//     }
// });

// var mailOptions = {
//     from: 'rajaguru@onedatasoftware.com',
//     to: 'monsterink26@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

//LoginCall
app.post('/login', (req, res) => {
  console.log(req.body.email);

  //TokenGeneration
  jwt.sign(req.body.email, 'My-Token', (err, token) => {
    console.log('===============*****************************=====================');
    console.log(req.body.email);
    console.log('================****************************====================');

    signup.findOne(
      {
        email: req.body.email,
        password: req.body.password,
      },
      { email: 1, username: 1, password: 1, _id: 1 },
      (err, doc) => {
        if (err) res.status(500).json(err);
        else if (doc) {
          console.log(doc);
          res.status(200).setHeader('MyToken', token);
          console.log('----' + token + '----');
          res.status(200).json(doc);
          // console.log(res);
        } else res.status(401).json({ msg: 'Invalid' });
      }
    );
  });

  //TokentVerification
  // jwt.verify(token,"MyToken", function (err, decoded) {
  //     console.log("Decoded" + decoded.email)
  // });
});

function tokenVerification(req, res, next) {
  console.log('token verification called');
  const Token = req.header['authorization'];
  console.log('' + Token);
  if (typeof Token !== 'undefined') {
    const splitToken = Token.split(' ');
    const header = splitToken[1];
    req.token = header;
    next();
  } else {
    console.log("Don't have token");
    res.sendStatus(403);
  }
}
