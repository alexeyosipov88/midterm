
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
const {getUserIdwithEmail, addNewUser, login} = require('./database');

module.exports = (db) =>  {
  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    getUserIdwithEmail(email, db).then((user) => {
      //checking if user.rows is undefined
      console.log("user", user);
      if (user) {
        return res.redirect("./login");
      }
    });
    //add user if userid do not exists in our database
    addNewUser(name, email, password, db).then((user) => {
              return res.redirect("/");
            });
  });

  router.get("/login", (req,res)=>{
    res.render("login");
  })

  router.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    //check if credentials match or not
    login(email, password, db)
    .then((user)=>{
      //check if it has some value
      if(user.rows === 'undefined')
      {
        console.log("I am inside the first if statement");
        return res.send("credentials do not match");
      }
        const userEmailFromDatabase = user.rows[0].email ;
        const userPasswordFromDatabase = user.rows[0].password ;
        if(userEmailFromDatabase !== email || userPasswordFromDatabase !== password)
        {
          return res.send("credentials do not match");
        }

        return res.redirect("/");
    })
  })

  router.get('/logout', (req,res) => {
    res.redirect('/');
  })

  return router;
}
