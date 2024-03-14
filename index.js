const express = require("express");
const app = express();
var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kbkzkbkz2001",
  database: "Patio",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Обработка GET-запросов к эндпоинту '/files'
app.get("/files", (req, res) => {
  selectPhotoPath(function (results) {
    // Действия с результатом запроса
    res.status(200).send({ files: results });
  });
});

// Слушаем порт 3000
app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});

function selectPhotoPath(callback) {
  connection.query("SELECT path FROM photo", function (error, results, fields) {
    if (error) throw error;
    console.log("results: ", results[0].path);
    console.log("fields: ", fields);
    callback(results);
  });
}
