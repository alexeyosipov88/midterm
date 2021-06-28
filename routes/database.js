const exports = {} ;
// /**CREATE ROLE labber WITH LOGIN password 'labber';
// CREATE DATABASE midterm OWNER labber; */

    //gets the userid from database
    const getUserIdwithEmail = function (email, db) {
      const vars = [email] ;
     return  db.query(`SELECT id FROM users WHERE email = $1`, vars)
     .then((data)=>{
        console.log(data.rows);
        return data.rows[0] ;
      })
    };
    exports.getUserIdwithEmail = getUserIdwithEmail;
//add a new user
    const addNewUser = function (name, email, password, db) {
      const vars = [name, email, password];
      return db
        .query(
          `INSERT INTO users(name, email,password) VALUES ('${name}','${email}','${password}') RETURNING * `
        )
        .then((user) => {
          //        console.log("User added", user.rows);
          return user.rows;
        });
    };
    exports.addNewUser = addNewUser;
//check if credentials match or not
const login = function (email, password, db) {
db.query(`SELECT id,email, password FROM users WHERE email = '${email}' AND password = '${password}'`)
.then((user)=>{
  return user.rows ;
})
};
exports.login = login ;








module.exports = exports
