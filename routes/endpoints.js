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
    db.query(`SELECT listings.*, users.id as user_id FROM listings JOIN users ON users.id = listings.user_id`)
      .then(data => {
        const listings = data.rows;
          res.json(listings);
      })

  });


  // get request after user click on the image link of individual item
  router.get('/listing/:id', (req, res) => {
    res.sendFile('./listing.html', {root:'./public'});;

  });

 // get request to fetch json from db to give it to lisiting/:id
  router.get('/item/:id', (req, res) => {
    console.log(req.params.id);
    db.query(`SELECT listings.*, animals.name as animal_name, categories.name as category_name
    FROM listings
    JOIN animals ON listings.animal_id = animals.id
    JOIN categories ON listings.category_id = categories.id
    WHERE listings.id = ${req.params.id}`)
      .then(data => {
        const item = data.rows[0];
        if (item.user_id !== req.session["user_id"]) {
          item.seller = true;
        } item.seller = false;
          res.json(item);
      })

  });

  //grab the users to show the username
  router.get('/listings/username', (req,res) => {
    console.log('cookie value is: ', req.cookies["user_id"])
    db.query(`SELECT * FROM users WHERE id = ${req.cookies["user_id"]}`)
    .then(data => {
      const user = data.rows[0] ;
      console.log('user object has',user);
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
