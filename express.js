const express = require("express");
const app = express();
const Mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path")
require("dotenv").config()
const cookies = require("cookie-parser")
const bcrypt = require('bcrypt');
const expressSession = require("express-session");
const multer = require('multer');

const port = 8080;

const userModel = require("./model/userModel")
const {SignupPage , formPage, HomePage , loginPage, deleteAccount, adminPage , userEdit, logout, newProject, getProjects, comments, deletProject, setting , searchUser, allProjects, overView } = require("./controller/userGetController")
const { login,signup ,deleteuser, userEditPost, userDeletePost, addProject, addComments, updateProject, memberAdd, addTopic, addTask, addAttachment} = require("./controller/postController");


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookies())
app.use(
    expressSession({
      secret: "secret key",
      cookie: {},
      resave: false,
      saveUninitialized: false,
    })
);


const storage = multer.diskStorage({
  destination: (req, file , cb) => {
    cb(null, "public/image")
  },
  filename:(req, file , cb) =>{
    console.log(file);
    cb(null , Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage : storage});

app.get("/", formPage);
app.get("/signup", SignupPage);
app.get("/home", HomePage);
app.get("/login", loginPage);
app.get("/delete", deleteAccount);
app.get("/admin", adminPage);
app.get("/logout",logout);
app.get('/users/:userId/edit', userEdit);
app.get('/newProject', newProject);
app.get("/getAllProjects", getProjects);
app.get("/allProjects", allProjects)
app.get("/comments/:id", comments);
app.get("/delete/project/:id", deletProject);
app.get("/setting/projectSetting/:id", setting);
app.get("/searchUser", searchUser);
app.get("/project/OverView/:id", overView)
app.post("/signup", signup);
app.post("/login", login);
app.post("/deleteuser", deleteuser);
app.post("/addProject", addProject);
app.post('/users/:userId/edit', userEditPost);
app.post('/users/:userId/delete', userDeletePost);
app.post("/addComment/:id", addComments);
app.post("/update/project", updateProject);
app.post("/overView/addTopic/:id", addTopic);
app.post("/overView/addTask/:id", addTask)
app.post('/members',memberAdd);
app.post('/overView/addAttachment/:id', upload.single('image'), addAttachment);



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
