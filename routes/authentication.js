const path = require('path');
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
/* const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session'); */

const {getUserWithEmail, addUser, getUser} = require('./database');

//res.sendFile('index.html', { root: __dirname });

module.exports = (db) =>  {
  router.get("/register", (req, res) => {
    // console.log(path);
    res.sendFile( 'register.html' , {root: './public'});
  });

  router.post("/register", (req, res) => {
    console.log(req.body);
     const user = {
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
       phone_number: req.body.phone_number,
       city: req.body.city,
       province: req.body.province
     };


     getUserWithEmail(db, req.body.email)
     .then((user) => {
      //checking if user.rows is undefined
      //  console.log("user", user.rows[0].email);
      if (user.rows[0].email === req.body.email) {
        console.log("user already exists");
     return res.redirect("./login");
      }
    });
    const rightUser = user;
    //add user if userid do not exists in our database
    addUser(db, user).then((user) => {
      console.log('wq23142342312412341A', rightUser);
      console.log("cookies value should be undefined at this line", req.session["user_id"]);
      req.session["user_id"] = user.rows[0].id;
              return res.redirect("./");
            });
  });

  router.get("/login", (req,res)=>{
    res.sendFile( 'login.html' , {root: './public'});
  })

  router.post("/login", (req,res) => {
console.log(req.body) ;
    const user = {
       email: req.body.email,
       password: req.body.password
    }
// console.log("getUser is: ", typeof getUser);
    //check if credentials match or not
    getUser(db,user)
    .then((user)=>{
      //check if it has some value
      if(user.rows === 'undefined')
      {
        return res.send("credentials do not match");
      }
        const userEmailFromDatabase = user.rows[0].email ;
        const userPasswordFromDatabase = user.rows[0].password ;
        if(userEmailFromDatabase !== req.body.email || userPasswordFromDatabase !== req.body.password)
        {
          return res.send("credentials do not match");
        }
        console.log( 'this is user',user.rows[0]);
        /* console.log('this is req.cookies', req.session); */
        req.session["user_id"] = user.rows[0].id;
        console.log("this is cookie id", req.session["user_id"]);
        return res.redirect("/");
    })
  })

  router.get('/logout', (req,res) => {
    //res. clearCookie('connect. sid', { path: '/' });
    //req.session["userid"] = null;
   req.cookies["user_id"] = null ;
    res.redirect('/');
  })

  return router;
}
