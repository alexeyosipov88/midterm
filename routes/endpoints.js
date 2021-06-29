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
    db.query(`SELECT * FROM listings`)
      .then(data => {
        console.log(data.rows);
        const listings = data.rows;
        //  console.log(listings);
        res.json(listings);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/search', (req,res) =>{
    console.log(req.body);
    db.query(`SELECT * FROM listings where name LIKE '${req.body.search}%'`)
    .then(data => {
      const listings = data.rows;
      res.json(listings);
    })
  })
  // router.get("/products", (req, res) => {
  //   db.query(`SELECT * FROM listings`)
  //   .then((data)=>{
  //     const listings = data.rows ;
  //     res.json({listings})
  //   })
  // })

return router;
}
