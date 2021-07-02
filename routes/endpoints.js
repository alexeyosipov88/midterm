const { Router } = require('express');
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
const database = require('./database');

module.exports = (db) => {

  // Home page
  router.get('/listing', (req, res) => {
    db.query(`SELECT listings.*, users.id as user_id FROM listings JOIN users ON users.id = listings.user_id`)
      .then(data => {
        let userLoggedIn = req.session["user_id"];
        if (userLoggedIn) {
          const listings = data.rows;
          return  res.json(listings);
        }
        const listings = data.rows;
        return res.json(listings);
      });
  });

  //grab the users to show the username
  router.get('/listings/username', (req,res) => {
    db.query(`SELECT * FROM users WHERE id = ${req.session["user_id"]}`)
      .then(data => {
        const user = data.rows[0];
        res.json(user);
      });
  });

  // get request after user click on the image link of individual item
  router.get('/listings/:id', (req, res) => {
    res.sendFile('./listing.html', {root:'./public'});
  });

  // get request to edit page with listing id
  router.get('/edit/:id', (req, res) => {
    res.sendFile('./edit.html', {root:'./public'});
  });

  // get request to fetch json from db to give it to lisiting/:id
  router.get('/item/:id', (req, res) => {
    db.query(`SELECT listings.*, animals.name as animal_name, categories.name as category_name
    FROM listings
    JOIN animals ON listings.animal_id = animals.id
    JOIN categories ON listings.category_id = categories.id
    WHERE listings.id = ${req.params.id}`)
      .then(data => {

        const item = data.rows[0];
        item.seller = true;
        if (!req.session || item.user_id !== req.session["user_id"]) {
          item.seller = false;
        }
        res.json(item);
      });
  });

//post request to search
  router.post('/search', (req,res) =>{
    db.query(`SELECT * FROM listings where name LIKE '%${req.body.search}%'`)
      .then(data => {
        const listings = data.rows;
        res.json(listings);
      });
  });

  router.get('/filter', (req,res) => {
    db.query(`SELECT * FROM listings ORDER BY price`)
      .then(data => {
        const listings = data.rows;
        res.json(listings);
      });
  });

  // message post for alexeyyyyyYYyyyyYyy
  router.post('/message', (req,res) => {
    db.query(
      `INSERT INTO messages (created_at, content, receiver_id, sender_id, listing_id)
       VALUES (${req.body.created_at}, ${req.body.content}, ${req.receiver_id}, ${req.body.sender_id}, ${req.body.listing_id});`)
      .then(result => {
        res.json(result);
      });
  });

  router.post('/edit/listing', (req,res) => {
    console.log(req.body)
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const photo = req.body.photo;
    const animal_id = req.body.animal_id;
    const category_id = req.body.category_id;
    const listing_id = req.body.id;
    db.query(`UPDATE listings
    SET name = $1, price = $2, description = $3, photo = $4,  animal_id = $5, category_id = $6
    WHERE id = $7
    RETURNING *;`, [name, price, description, photo, animal_id, category_id, listing_id])
      .then((result) => {
        res.redirect('/');
      });
  });

  return router;
};
