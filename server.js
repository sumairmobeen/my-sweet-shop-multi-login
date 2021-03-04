const PORT = process.env.PORT || 5000;
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
var jwt = require('jsonwebtoken');
var http = require("http");
var path = require('path')
var {userModel} = require("./dbrepo/models");

var { SERVER_SECRET } = require("./core/index");

var authRoutes = require("./routes/auth");

var app = express();

var server = http.createServer(app);



app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(morgan('dev'));


app.use("/", express.static(path.resolve(path.join(__dirname, "front-end/build"))))

app.use('/auth', authRoutes);

app.use(function (req, res, next) {

    console.log("req.cookies: ", req.cookies);

    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {

            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate; // 84600,000

            if (diff > 300000) { // expire after 5 min (in milis)
                res.send({
                    message: "TOKEN EXPIRED",
                    status: 401
                });
            } else { // issue new Token
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    phone: decodedData.phone
                }, SERVER_SECRET)

                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                next();
            }
        } else {
            res.send({
                message: "Invalid Token",
                status: 401
            });
        }


    });

});

app.get("/profile", (req, res, next) => {
    console.log(req.body);

    userModel.findById(req.body.jToken.id, 'name email phone createdOn role', function (err, doc) {
        if (!err) {
            res.send({
                profile: doc
            })

        } else {
            res.send({
                message: "Server Error",
                status: 500
            });
        }
    });
})

app.post('/admindashboard', (req, res, next) => {
    if (!req.body.productname || !req.body.price || !req.body.productimage || !req.body.activeStatus || !req.body.stock || !req.body.description) {
        res.send({
            message: "Please Fill All Product Info",
            status: 301
        });
    }
    userModel.findById(req.body.jToken.id, 'email role', function (err, user) {
        if (!err) {
            if (user.role === "admin") {
                adminModel.create({
                    "productname": req.body.productname,
                    "price": req.body.price,
                    "productimage": req.body.productimage,
                    "activeStatus": req.body.activeStatus,
                    "stock": req.body.stock,
                    "description": req.body.description
                }, function (err, data) {
                    if (err) {
                        res.send({
                            message: " DB ERROR",
                            status: 404
                        });
                    }
                    else if (data) {
                        res.send({
                            status: 200,
                            message: "Added",
                            data: data
                        });
                    } else {
                        res.send({
                            message: "err",
                            status: 500
                        });
                    }
                })
            } else {
                res.send({
                    message: "Only Edit  Admin",
                    status: 404
                })
            }
        }
        else {
            res.send({
                message: "Only Edit  Admin",
                status: 404
            });
        }
    })
})





server.listen(PORT, () => {
    console.log("Server is Running:", PORT);
});