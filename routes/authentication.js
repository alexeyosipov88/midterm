const express = require('express');
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

module.exports = (db) => {
  //Looks up if an email exists or not
const emailLooker = (emailFromDatabase, userEmail) =>{
if(emailFromDatabase === userEmail){
  //email exsits
 // return useridfrom database
 }
}

  router.get("/register", (req, res) => {
    res.render();
  });

  router.post("/register", (req,res) => {
   const userId   ;

    //code
    const errorMsg = "User email exists, please login";
    //const userId = generateRandomString();
    const userLogin = req.body;
    const newUser = {
      id,
      email,
      password
    };

    let user = emailLooker(userLogin.email, users);
    //checking if user email exists or not
    if (user) {
      if (user.email === userLogin.email) {
        // send error msg & early return to stop the function
        return res.status(403).send(errorMsg);
      }
    }
    users[userId] = newUser;
    req.session["userid"] = userId;
    res.redirect("/urls");
  })
  return router;
};
