// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
// const { Pool } = require('pg');
//   const args = process.argv.slice(2);
//   const pool = new Pool({
//     user: 'vagrant',
//     password: '123',
//     host: 'localhost',
//     database: 'lightbnb'
//   });


const { Pool } = require('pg');
const dbParams = require('../lib/db');
const pool = new Pool(
  dbParams
);


const getAllusers = function () {
  return pool
    .query(`SELECT *
  FROM users`)
    .then((result) => {
      return result.rows[0];
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}
exports.getAllusers = getAllusers;

const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT *
  FROM users
  WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}
exports.getUserWithEmail = getUserWithEmail;


const addUser = function (user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;
  const phone_number = user.phone_number;
  const city = user.city;
  const province = user.province;
  return pool
    .query(`INSERT INTO users (name, email, password, phone_number, city, province)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;`, [name, email, password, phone_number, city, province])
    .then((result) => {
      return result.rows[0];
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}
exports.addUser = addUser;



const getFavourites = function (user_id) {
  return pool
    .query(`SELECT *
  FROM favourites
  WHERE user_id = $1`, [user_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}
exports.getFavourites = getFavourites;


const getByFilter = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT *
  FROM listings
  WHERE 1 = 1
  `;
  if (options.user_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.province) {
    queryParams.push(`%${options.province}%`);
    queryString += `AND province LIKE $${queryParams.length} `;
  }

  if (options.minimum_price) {
    const minPrice = Number(options.minimum_price) * 100;
    queryParams.push(`${minPrice}`);
    queryString += `AND price >= $${queryParams.length} `;
  }
  if (options.maximum_price) {
    const maxPrice = Number(options.maximum_price) * 100;
    queryParams.push(`${maxPrice}`);
    queryString += `AND price <= $${queryParams.length} `;
  }

  // 4
  if (options.minimum_rating) {
    const minRating = options.minimum_rating;
    console.log(minRating);
    queryParams.push(`${minRating}`);
    queryString += `GROUP BY properties.id
    HAVING  avg(rating) >= $${queryParams.length} `;
  } else {
    queryString += `GROUP BY properties.id
     `
  }

  queryParams.push(limit);

  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getByFilter = getByFilter;


const addListing = function (listing) {
  const name = listing.name;
  const price = listing.price;
  const description = listing.description;
  const photo = listing.photo;
  const created_at = listing.created_at;
  const user_id = listing_user_id;
  const animal_id = listing_animal_id;
  const category_id = listing_category_id;

  return pool
    .query(`INSERT INTO listing (name, price, description, photo, created_at, user_id,  animal_id, category_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;`, [name, price, description, photo, created_at, user_id, animal_id, category_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}
exports.addListing = addListing;







