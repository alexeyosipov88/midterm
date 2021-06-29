const path = require('path');
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
const {getUserWithEmail, addUser, getUser} = require('./database');

//res.sendFile('index.html', { root: __dirname });

module.exports = (db) =>  {
  router.get("/register", (req, res) => {
    // console.log(path);
    res.sendFile( 'register.html' , {root: './public'});
  });

  router.post("/register", (req, res) => {
     const user = {
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
     };
     getUserWithEmail(db, req.body.email)
     .then((user) => {
      //checking if user.rows is undefined
      // console.log("user", user);
      if (user) {
        return res.redirect("./login");
      }
    });
    //add user if userid do not exists in our database
    addUser(db, user).then((user) => {
              return res.redirect("/");
            });
  });

  router.get("/login", (req,res)=>{
    res.sendFile( 'login.html' , {root: './public'});
  })

  router.post("/login", (req,res) => {

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
        console.log("I am inside the first if statement");
        return res.send("credentials do not match");
      }
        const userEmailFromDatabase = user.rows[0].email ;
        const userPasswordFromDatabase = user.rows[0].password ;
        if(userEmailFromDatabase !== req.body.email || userPasswordFromDatabase !== req.body.password)
        {
          return res.send("credentials do not match");
        }

        return res.redirect("/");
    })
  })

  router.get('/logout', (req,res) => {
    res.redirect('/');
  })

  router.get('/user', (req,res)=>{
    res.sendFile( 'user.html' , {root: './public'});
  })

  return router;
}
