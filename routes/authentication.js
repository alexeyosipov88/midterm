
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
const {getUserIdwithEmail, addNewUser, login} = require('./database');
/*
users = {
          user_id:
                  {
                    id: 1,              //randomlyGeneratedString ? or a query from database ?
                    email: '',
                    password: ''
                  }
}
*/

module.exports = (db) =>  {
  router.get("/register", (req, res) => {
    res.render("register");
    //res.send('Hello');
  });

  router.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // const vars = [name, email, password];
    // console.log(vars);
    //checking if user exists
    getUserIdwithEmail(email, db).then((user) => {
     // console.log("User exists", user.rows);
      if (user.rows === false) {
        //add user if userid do not exists in our database
        addNewUser(name, email, password, db).then((user) => {
  //        console.log("User added", user.rows);
          return user.rows;
        });
      }
    });
    return res.redirect("./login");
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

        return res.redirect("/urls");
    })
  })

  router.get('/logout', (req,res) => {
    res.redirect('/');
  })

  return router;
}
