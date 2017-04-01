var nodemailer = require("nodemailer");
var configParameters = require('./config.js').configuration();


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "donyferns12@gmail.com",
        pass: "donny08_"
    }
});

var sendMail = function (from, to, pass) {
    var mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: 'Blurb Bidding | Reset Password', // Subject line
        text: 'Your New Password is ' + pass, // plaintext body

    }
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent");
        }


    });

}



var signupMail = function (from, to, name) {
    var mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: 'Blurb Bidding | Welcome Mail', // Subject line   
        html: '<p>Hello ' + name + ',</p><br><div id="header"><h1 style="margin-bottom:0;">Welcome to Blurbio Platform</h1><p>    "Please click <a href=' + configParameters.host + '>here</a> to access Blurbio Platform" </p></div>'
    };
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent");
        }


    });

}

module.exports.sendMail = sendMail;
module.exports.signupMail = signupMail;