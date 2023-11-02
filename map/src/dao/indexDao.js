const { pool } = require("../../config/database");

exports.selectRestaurants = async function (connection, title) {
  const selectAllRestaurantsQuery = `SELECT title, address, phone, info FROM Restaurants where status = 'A';`;
  const selectCategoriedRestaurantsQuery = `SELECT title, address, phone, info FROM Restaurants where status = 'A' and title = '?;`;
  const Params = [title];

  const Query = title 
  ? selectCategoriedRestaurantsQuery
  : selectAllRestaurantsQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};