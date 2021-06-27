// const { Pool } = require("pg");

/**CREATE ROLE labber WITH LOGIN password 'labber';
CREATE DATABASE midterm OWNER labber; */

  module.exports = (db) => {
    //gets the userid from database
    const getUserID = function (email, password) {
      const vars = [email, password] ;
     return  db.query('SELECT id FROM users WHERE email = $1 AND password = $2', vars)
     .then((data)=>{
        console.log(data.rows);
        return data.rows[0] ;
      })
      // const queryString = `SELECT * FROM users WHERE email LIKE $1`;
      //const limit = [email];
    };
    // return getUserID

    const addNewUser = function(name, email, password) {
      const vars = [name, meail, password] ;
      return db.query('INSERT INTO users(name, email, column) VALUES ($1, $2, $3) RETURNING *')
      .then((data)=>{
        return data.rows ;
      })

    }




  }
