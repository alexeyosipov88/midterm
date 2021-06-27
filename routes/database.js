
// /**CREATE ROLE labber WITH LOGIN password 'labber';
// CREATE DATABASE midterm OWNER labber; */

//     //gets the userid from database
//     const getUserID = function (email, password) {
//       const vars = [email, password] ;
//      return  db.query('SELECT id FROM users WHERE email = $1 AND password = $2', vars)
//      .then((data)=>{
//         console.log(data.rows);
//         return data.rows[0] ;
//       })
//     };
//     exports.getUserID = getUserID;
// //add a new user
//     const addNewUser = function(name, email, password) {
//       const vars = [name, email, password] ;
//       return db.query('INSERT INTO users(name, email, column) VALUES ($1, $2, $3) RETURNING *')
//       .then((data)=>{
//         return data.rows ;
//       })
//     }
//     exports.addNewUser = addNewUser;








