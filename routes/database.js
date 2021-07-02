const getUser = function (db, user) {
const email = user.email ;
const password = user.password ;

  return db.query(`SELECT *
  FROM users WHERE email = $1 AND password = $2`,[email,password])
    .then((result) => {
      return result;
    })

}
exports.getUser = getUser ;


const getUserWithEmail = function (db, email) {
  return db.query(`SELECT *
  FROM users
  WHERE email = $1`, [email])
    .then((result) => {
      return result;
    })
}
exports.getUserWithEmail = getUserWithEmail;

const addUser = function (db, user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;
  const phone_number = user.phone_number;
  const city = user.city;
  const province = user.province;
  return db.query(`INSERT INTO users (name, email, password, phone_number, city, province)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;`, [name, email, password, phone_number, city, province])
    .then((result) => {
      return result;
    })
  }
  exports.addUser = addUser ;


const addMessage = function (db, message) {
  const created_at = now();
  const content = message.content;
  const receiver_id = message.receiver_id;
  const sender_id = message.sender_id;
  const listing_id = message.listing_id;
  return db.query(`INSERT INTO users (created_at, content, receiver_id, sender_id, listing_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;`, [created_at, content, receiver_id, sender_id, listing_id])
    .then((result) => {
      return result;
    })
}
exports.addMessage = addMessage ;

const getFavourites = function (db, user_id) {
  return db.query(`SELECT *
  FROM favourites
  WHERE user_id = $1`, [user_id])
    .then((result) => {
      return result;
    })
}
exports.getFavourites = getFavourites ;

const getMessages = function (db, user_id) {
  return db.query(`SELECT *
  FROM messages
  WHERE sender_id = $1 OR receiver_id = $2`, [user_id, user_id])
    .then((result) => {
      return result;
    })
}
exports.getMessages = getMessages ;

const getByFilter = function (db, options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT *
  FROM listings
  WHERE 1 = 1
  `;
  if (options.user_id) {
    queryParams.push(`${options.user_id}`);
    queryString += `AND user_id = $${queryParams.length} `;
  }
  // 3
  if (options.animal_id) {
    queryParams.push(`${options.animal_id}`);
    queryString += `AND animal_id = $${queryParams.length} `;
  }

  if (options.category_id) {
    queryParams.push(`${options.category_id}`);
    queryString += `AND category_id = $${queryParams.length} `;
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

  queryParams.push(limit);
  queryString += `
  ORDER BY price
  LIMIT $${queryParams.length};
  `;
  // 5
  return db.query(queryString, queryParams).then((res) => res);
};
exports.getByFilter = getByFilter ;

const addListing = function (db, listing) {
  const name = listing.name;
  const price = listing.price;
  const description = listing.description;
  const photo = listing.photo;
  const created_at = listing.created_at;
  const user_id = listing_user_id;
  const animal_id = listing_animal_id;
  const category_id = listing_category_id;

  return db.query(`INSERT INTO listing (name, price, description, photo, created_at, user_id,  animal_id, category_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;`, [name, price, description, photo, created_at, user_id, animal_id, category_id])
    .then((result) => {
      return result.rows[0];
    })
}


exports.addListing = addListing ;
