const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
const database = require('./database');

// /users routes

// GET  '/register'
// POST '/register'
// GET '/login'
// POST '/login'
// POST '/logout'

// /widgets routes
// GET '/' /* GET for browsing featured items */
// GET '/items' /* GET for browsing all or filtered items*/
// GET '/items/filter' /* GET and POST for filterting itemes, redirects to ''/
// items*/
// POST '/items/filter'
// GET '/items/:id' /* GET FOR browsing individual item */
// GET '/items/:userID' /* GET and POST for browsing posted items and marking S
// OLD */
// POST '/items/:userID'
// GET '/items/:userID/favourites' /* GET for browsing favourite items of the user*/
// GET '/items/:userID/post' /* GET and POST for putting and item for sale */
// POST '/items/:userID/post' REDIRECT to seller's listings
// POST '/items/:userID/delete' /* POST for  deleting and item*/
// GET '/messages' /* GET and POST for browsing and sending messages */
// POST '/messages'

module.exports = (db) => {

  // Home page
    router.get('/listing', (req, res) => {
    // console.log('@#$%^&*');
    db.query(`SELECT * FROM listings JOIN users ON users.id = listings.user_id`)
      .then(data => {
        const listings = data.rows;
          res.json(listings);
      })

  });
  //grab the users to show the username
  router.get('/listing/user', (req,res) => {
    db.query(`SELECT * FROM users WHERE id = ${req.session["user_id"]}`)
    .then(data => {
      const user = data.rows ;
      res.json(user);
    })
  })

  router.post('/search', (req,res) =>{
    db.query(`SELECT * FROM listings where name LIKE '%${req.body.search}%'`)
    .then(data => {
      const listings = data.rows;
      res.json(listings);
    })
  })

  router.get('/filter', (req,res)=>{
    db.query(`SELECT * FROM listings ORDER BY price`)
    .then(data => {
      const listings = data.rows ;
      res.json(listings);
    })
  })


return router;
}
