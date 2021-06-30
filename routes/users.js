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
    db.query(`SELECT * FROM listings WHERE user_id = 1`).then((result) => {
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
    db.query(`SELECT * FROM favourites WHERE user_id = 1`).then((result) => {
      const favourites = result.rows;
      res.json(favourites);
    });
  })

  router.get('/inbox', (req, res) => {
    res.sendFile('./inbox.html', {root:'./public'});
  })

  return router;
};
