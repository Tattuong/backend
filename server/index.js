require("dotenv").config(); //bien moi truong
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const flash = require("req-flash");
var session = require('express-session');
const jwt = require('jsonwebtoken') //quan li viec login, logout, xac thuc nguoi dung



const apiRouter = require("./routes");
const { router } = require("./routes/auth");

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/coffee',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));

app.use(morgan("combined"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.post('/login', (req, res) => {
//   // Authentication
//   // Authorization
//   // { username: 'Test' }
//   const data = req.body;
//   console.log({ data });
//   const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: '30s',
//   });
//   const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
//   refreshTokens.push(refreshToken);
//   res.json({ accessToken, refreshToken });
// });

// app.post('/logout', (req, res) => {
//   const refreshToken = req.body.token;
//   refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
//   res.sendStatus(200);
// });

// app.get('/home', (req, res, next) =>{
//   try {
//     const token = req.token
//     const kq = jwt.verify(token, 'mk')
//     const user = db.find(token.id)
    
//     res.data = user
//     if(kq){
//       next()
//     }
//   }
//   catch (error){
//     return res.redirect('/login')
//   }
// }, (req, res, next) => {
//   res.json('welcome')
// })


app.use("/api", apiRouter);

app.use("/" , router)

app.use(express.static(path.join(__dirname, "public")));

app.use(flash());

const PORT = process.env.PORT || 3012;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
