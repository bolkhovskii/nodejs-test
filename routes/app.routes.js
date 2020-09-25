const { Router } = require("express");
const pool = require("../dbconfig");
const router = Router();

//тест
router.get("/api", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

//Получить всех пользователей
router.get("/api/query", (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

//Создать пользователя
router.post("/api/query", (request, response) => {
  const { name, email, password } = request.body;
  pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
});

//Редактировать существующего пользователя
router.put("/api/query/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email, password } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
    [name, email, password, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
});

//Удалить пользователя
router.delete("/api/query/:id", (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
});

module.exports = router;
