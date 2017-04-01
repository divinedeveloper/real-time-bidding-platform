var crypto = require('crypto');


// GET ALL User API

exports.userAll = function (connection) {
    return function (req, res) {
        var query = "SELECT * FROM blurbio.user where user.delflag=0;"
        connection.query(query, function (err, rows, fields) {
            if (err != null)
                res.json(err);
            else if (rows.length == 0)
                res.json("User Not Available");
            else {
                res.json({
                    error: false,
                    message: "Available Users",
                    response: rows
                });
            }
        });
    }
};

//GET User by id

exports.userOne = function (connection) {
    return function (req, res) {
        if (isNaN(req.params.id)) {

            res.end("Enter valid userid");
            return false;
        }
        var query = "SELECT * FROM blurbio.user where iduser =" + req.params.id + " AND delflag=0;";
        connection.query(query, function (err, rows, fields) {
            if (err != null)
                res.json(err);
            else if (rows.length == 0)
                res.json("User Not Available");
            else {
                res.json({
                    error: false,
                    message: "Available Users",
                    response: rows
                });
            }
        });
    }
};


// User POST API

exports.userAdd = function (connection) {
    return function (req, res) {
        var usertype = req.body.usertype;
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var comname = req.body.companyname;
        var ph = req.body.phone;
        var desc = req.body.description;
        var logo = req.body.logo
        if (!isNaN(usertype) || !isNaN(email) || !password || !isNaN(name) || !isNaN(comname) || isNaN(ph) || !isNaN(desc) || !ph || !isNaN(logo)) {
            res.end("Enter valid Input");
            return false;
        }
        var pw = crypto.createHmac('sha1', 'abcdeg').update(password).digest('hex');
        var query = "INSERT INTO blurbio.user (name,email,password,company,phone,description,logo,type) VALUES ('" + name + "','" + email + "','" + pw + "','" + comname + "','" + ph + "','" + desc + "','" + logo + "','" + usertype + "');"
        connection.query(query, function (err, rows) {
            console.log(query);
            if (err != null) {
                console.log(err);
                res.json({
                    error: true,
                    message: "User Account Not Created",
                    response: err
                });
            } else {
                res.json({
                    error: false,
                    message: "Account Created",
                    response: rows
                })
            };
        })
    }
};

// SignUp Method
exports.userSignup = function (connection) {
    return function (req, res) {
        var email = req.body.email;
        if (!isNaN(email)) {
            res.json("Please enter valid emailid");
            return false;
        }

        var password = req.body.password;
        if (!password) {
            res.json("Please enter valid password");
            return false;
        }
        var pw = crypto.createHmac('sha1', 'abcdeg').update(password).digest('hex');
        var query = "INSERT INTO blurbio.user (email,password) VALUES ('" + email + "','" + pw + "');"
        connection.query(query, function (err, rows) {
            console.log(query);
            if (err != null) {
                console.log(err);
                res.json({
                    error: true,
                    message: "User could not SignUp",
                    response: err
                });
            } else {
                res.json({
                    error: false,
                    message: "Account Created",
                    response: rows
                })
            };
        })
    }
};

////Login Method
//exports.userLogin = function (connection) {
//    return function (req, res) {
//
//        console.log('in user');
//        var email = req.body.email;
//        var passwordfrmUser = req.body.password;
//        if (passwordfrmUser == null) {
//            res.send({
//                message: "Password cannot be blank."
//            }, 401);
//            res.end()
//        } else {
//            console.log("EMAIL: " + email);
//            console.log('password = ' + passwordfrmUser);
//            var query = "SELECT id,email,password,usertype,name,company,phone,description,logo FROM blurbio.user where email ='" + email + "';";
//            connection.getConnection(function (err, connection) {
//                connection.query(query, function (err, rows) {
//                    console.log("QUERY : " + query);
//                    console.log("DATA : " + JSON.stringify(rows));
//                    // There was an error or not?
//                    if (err != null) {
//                        console.log(err);
//
//                        res.end("Login Query error:" + err);
//                    } else {
//                        if (rows.length == 0) {
//                            console.log('No data from query');
//                            res.send({
//                                message: "Incorrect eMail"
//                            }, 401);
//                            res.end();
//                        } else {
//                            res.send({
//                                message: "In Correct UserName and Password"
//                            }, 401);
//                            res.end();
//                        }
//                    }
//                })
//            });
//            connection.release();
//
//        }
//
//    }
//};

// DELETE User by id 

exports.userDelete = function (connection) {
    return function (req, res) {
        if (isNaN(req.params.id)) {

            res.end("Enter valid userid");
            return false;
        }
        var query = "UPDATE blurbio.user SET delflag = 1 where iduser =" + req.params.id;
        connection.query(query, function (err, rows) {

            if (err != null) {
                console.log(err);
                res.json({
                    error: true,
                    message: "Cannot Delete User",
                    response: err
                });
            } else {
                res.json({
                    error: false,
                    message: "User Deleted...",
                    response: rows
                });
            }
        });
    }
};

// UPDATE User 

exports.userUpdate = function (connection) {
    return function (req, res) {
        var Uid = req.params.id;

        var usertype = req.body.usertype;
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var comname = req.body.companyname;
        var ph = req.body.phone;
        var desc = req.body.description;
        var logo = req.body.logo;
        var pw = crypto.createHmac('sha1', 'abcdeg').update(password).digest('hex');

        if (!isNaN(usertype) || !isNaN(email) || !password || !isNaN(name) || !isNaN(comname) || isNaN(ph) || !isNaN(desc) || !ph || !isNaN(logo)) {
            res.end("Enter valid Input");
            return false;
        }
        var query = "UPDATE blurbio.user SET email='" + email + "',password='" + password + "',type = '" + usertype + "', name='" + name + "',company='" + comname + "',phone='" + ph + "',description='" + desc + "',logo='" + logo + "' where iduser =" + req.params.id;
        connection.query(query, function (err, data, fields) {
            console.log(query);
            if (err != null) {
                console.log(err);
                res.json({
                    error: true,
                    message: "Cannot Update User !",
                    response: null
                })
            } else {
                var query2 = "SELECT * FROM blurbio.user where user.iduser=" + Uid;
                connection.query(query2, function (err, data, fields) {
                    console.log(Uid);
                    if (err != null) {
                        console.log(err);
                        res.json({
                            error: true,
                            message: "Cannot Update User !",
                            response: err
                        })
                    } else {
                        res.json({
                            error: false,
                            message: "User Updated",
                            response: data[0]
                        })
                    };
                })
            }
        });
    }
};