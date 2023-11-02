const { pool } = require("../../config/database");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

exports.readRestaurants = async function (req, res) {
    const { title } = req.query;
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectRestaurants(connection, title);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200,
        message: "끼얏호 요청 성공",
      });
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        connection.release();
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};