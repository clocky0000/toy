const mysql = require("mysql2/promise");
const secret = require("./secret");

const pool = mysql.createPool({
  host: secret.host,
  user: secret.user,
  port: secret.port,
  password: secret.password,
  database: secret.database,
});

module.exports = {
  pool: pool,
};

const exampleNonTransaction = async (sql, params) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await connection.query(sql, params);
      connection.release();
      return rows;
    } catch (err) {
      console.error(err);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const exampleTransaction = async (sql, params) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      await connection.beginTransaction(); // START TRANSACTION
      const [rows] = await connection.query(sql, params);
      await connection.commit(); // COMMIT
      connection.release();
      return rows;
    } catch (err) {
      await connection.rollback(); // ROLLBACK
      connection.release();
      console.error(err);
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};