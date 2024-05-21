// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'test ok' });
// });

// module.exports = router;
const URL = 'mongodb://localhost:27017/tripbox';
const {MongoClient} = require('mongodb');
const express = require('express');
const cors = require('cors');
const {request} = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const secret  = 'asdgfhje567lumhfngvd';
const salt =bcrypt.genSaltSync(10);
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs  = require('fs');
app.use(cors({credentials: true,origin: 'http://localhost:3000'})); //возможно другой хост нужно будет
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));// Вызов функции
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

mongoose.connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.post('/register', async (req, res) => {
    const {username,password} = req.body;

    // const userDoc = await User.create({username, password});
    // res.json(userDoc);
    try{
        console.log('Received data:', username, password);
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(e){
        console.log(e);
        res.status(400).json(e);
    }

});

app.post('/login', async (req,res) => {
   const {username, password} = req.body;
   const userDoc = await User.findOne({username});
   const passOk = bcrypt.compareSync(password, userDoc.password);
   if (passOk){
       //logged in
       jwt.sign({username, id: userDoc._id}, secret, {}, (err,token) =>{
           if (err) throw err;
           res.cookie('token', token).json({
               id:userDoc._id,
               username,
           });
       })
       //res.json();
   } else {
       res.status(400).json('wrong credentials');
   }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if (err) throw err;
        res.json(info);
    })
    res.json(req.cookies);
})

app.post('/logout', (req,res) =>{
    res.cookie('token', '').json('ok');
})
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);


    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author:info.id,
        });

        res.json(postDoc);
    });

    //res.json(postDoc);
});


app.get('/post', async (req,res) =>{
    res.json(await Post.find());
});
app.get('/test', (req,res) => {

    res.json('test ok');
 });

app.listen(4000);
//
const posts = [
    {
        id: 1,
        title: 'Териберка. Путешествие на край земли',
        time: '2024-04-11 14:00',
        img: "1689024302_vsegda-pomnim-com-p-teriberka-murmanskaya-zimoi-foto-17.jpg",
         summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
            "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis " +
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
            " eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident," +
            "sunt in culpa qui officia deserunt  mollit anim id est laborum."
    },
    {
        id: 2,
        title: 'Коми. Печоро-Илычский заповедник',
        time: '2024-04-11 14:00',
        img: "1.jpg",
        // "https://syktsu.ru/upload/iblock/33a/1.jpg"
        summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
            "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis " +
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
            " eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident," +
            "sunt in culpa qui officia deserunt  mollit anim id est laborum."
    },
    {
        id: 3,
        title: 'Себежский укрепрайон',
        time: '2024-04-11 14:00',
        img: "DSC08294_min.jpg",
        summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
            "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis " +
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
            " eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident," +
            "sunt in culpa qui officia deserunt  mollit anim id est laborum."
    }
];
// console.log(Post.findById(1));
// if (Post.findById(1)){
//     for (const post of posts) {
//         Post.create({
//             title:post.title,
//             summary:post.summary,
//             content:post.summary,
//             cover:"uploads/"+post.img,
//             author:null
//
//         });
//     }
// }

