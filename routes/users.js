/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/profile', (req,res)=>{
    res.sendFile( 'user.html' , {root: './public'});
  })

  router.get("/profile/mylistings", (req, res) => {
    if (!req.session['user_id']) {
      res.send(false);
    }
    db.query(`SELECT * FROM listings WHERE user_id = ${req.session["user_id"]};`).then((result) => {
      const user = result.rows;
      res.json(user);
    });
  });

  router.get('/post', (req,res)=>{
    res.sendFile( 'create_listing.html', {root: './public'});
  })

  router.get('/listings', (req, res) => {
    res.sendFile('listing.html',{root: './public'});
  })

  router.get('/favourites', (req, res) => {
    res.sendFile('favourites.html',{root: './public'});
  })

  router.get('/profile/myFavourites', (req, res) => {
    if (!req.session['user_id']) {
      res.send(false);
    }
    db.query(`SELECT *
    FROM listings
    JOIN favourites ON listings.id = favourites.listing_id WHERE favourites.user_id = ${req.session["user_id"]}`).then((result) => {
      const favourites = result.rows;
      res.json(favourites);
    });
  })

  router.post('/profile/delete/:id', (req, res) => {
    const listing_id = req.params.id;
    db.query(`DELETE FROM listings WHERE id = '${listing_id}'`).then((result) => {
    res.json(result);
    });
  })

  router.post('/profile/unfavourite/:id', (req, res) => {
    const listing_id = req.params.id;
    db.query(`DELETE FROM favourites WHERE id = '${listing_id}'`).then((result) => {
    res.json(result);
    });
  })

  router.post('/profile/favourite/:id', (req, res) => {
    const listing_id = req.params.id;
    db.query(`INSERT INTO favourites (user_id, listing_id)
    VALUES ($1, $2)
    RETURNING *;`, [req.session["user_id"], listing_id])
    .then((result) => {
    res.json(result);
    });
  })

  router.post('/profile/sold/:id', (req, res) => {
    const listing_id = req.params.id;
    db.query(`UPDATE listings
    SET is_active = FALSE
    WHERE id = '${listing_id}'`).then((result) => {
    res.json(result);
    });
  })


  router.post('/post', (req, res) => {
    const listing =  req.body;
    db.query(`INSERT INTO listings (name, price, description, photo, animal_id, category_id, user_id, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, now())
    RETURNING *;`, [listing.name, listing.price, listing.description, listing.photo, listing.animal_id, listing.category_id, req.session["user_id"]]).then((result) => {
      res.send(result);
    });

    res.redirect("/");
  })


  router.get('/inbox', (req, res) => {
    res.sendFile('./inbox.html', {root:'./public'});

  })


  //WILL BE CHANGED FOR COOKIE ID LATER

  router.get('/inbox/messages', (req, res) => {
    db.query(`SELECT messages.id, receiver_id, messages.content, messages.sender_id, users.phone_number, users.name as user_name ,users.email,
    listings.name, listings.price, listings.photo, listings.id as listing_id
    FROM messages
    JOIN users ON messages.sender_id = users.id
    JOIN listings ON messages.listing_id = listings.id
    WHERE receiver_id = ${req.session["user_id"]}`).then((result) => {
      const messages = result.rows;
      res.json(messages);
    });

  })

  router.post('/inbox/messages/delete/:id', (req, res) => {
    const message_id = req.params.id;
    db.query(`DELETE FROM messages WHERE id = '${message_id}'`).then((result) => {
    res.json(result);
    });
  })



  return router;
};

