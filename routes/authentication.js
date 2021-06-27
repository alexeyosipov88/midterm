const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
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
  //checking if user is already registered in our database
const isUser = function (email, password) {
  const vars = [email, password];
  db.query('SELECT id FROM users WHERE name = $1 AND password = $2', vars).then((user)=>{
    return user;
  })
};

  router.get('/register', (res,req)=> {
    // res.render('register.ejs');
        res.send('Hello');
  })

  router.post('/register', (res,req)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    isUser(email,password)
    .then((user) => {
      if(user){
        console.log(user);
        res.redirect('./login');
      }
    })
    const vars = [name, email, password]
    db.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING', vars)
    .then((user)=>{
      console.log(user);
    })



  })

  return router;
}
