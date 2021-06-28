
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
const database = require('./database');
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
  // const login =  function(email, password) {
  //   return database.getUserWithEmail(email)
  //   .then(user => {
  //     if (bcrypt.compareSync(password, user.password)) {
  //       return user;
  //     }
  //     return null;
  //   });
  // }
  // exports.login = login;


  router.get("/register", (req, res) => {
    res.render("register");
    //res.send('Hello');
  });

  router.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const vars = [name, email, password];
    console.log(vars);
    //checking if user exists
    db.query(`SELECT id FROM users WHERE email = '${email}'`).then((user) => {
      console.log("User exists",user.rows);
      if (user.rows) {
       return res.redirect("./login");
      }
    });

    //add user if userid do not exists in our database
    db.query(`INSERT INTO users(name, email,password) VALUES ('${name}','${email}','${password}') RETURNING * `)
    .then((user)=>{
      console.log("User added",user.rows);
      return user.rows ;
    });
  });

  router.get("/login", (req,res)=>{
    res.render("login");
  })

  return router;
}
