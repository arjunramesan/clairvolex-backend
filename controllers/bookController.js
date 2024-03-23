const db = require("../database");

function searchBooks(criteria, res) {
  const {
    title,
    author,
    publishedFrom,
    publishedTo,
    genre,
    sortOrder = "title",
    page = 1,
    size = 10,
    inStock,
  } = criteria;

  let sql = `SELECT * FROM books WHERE 1=1`;
  if (title) sql += ` AND title LIKE '%${title}%'`;
  if (author) sql += ` AND author LIKE '%${author}%'`;
  if (publishedFrom && publishedTo)
    sql += ` AND DATE_FORMAT(publication_date, '%Y-%m-%d') BETWEEN '${publishedFrom}' AND '${publishedTo}'`;
  if (genre) sql += ` AND genre='${genre}'`;
  if (inStock) sql += ` AND stock_count > 0`;

  sql += ` ORDER BY ${sortOrder}`;
  

  const offset = (page - 1) * size;
  sql += ` LIMIT ${size} OFFSET ${offset}`;

  db.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: error.code, data: [] });
    }
    res.json({
      data: results,
    });
  });
}

module.exports = {
  searchBooks,
};
