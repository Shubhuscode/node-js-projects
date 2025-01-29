
const express = require("express");
const mysql = require("mysql2");

const app = express();


const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb1",
};

const pool = mysql.createPool(dbConfig);


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const addressFilter = req.query.address || "";

  const updateQuery = "UPDATE customers SET address = 'MUMBAI' WHERE address = 'Mumbai'";

  pool.query(updateQuery, (err, updateResult) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).send("Error updating data");
    }

    console.log(updateResult.affectedRows + " record(s) updated");

    const selectQuery = addressFilter
      ? "SELECT * FROM customers WHERE address = ? ORDER BY address"
      : "SELECT * FROM customers ORDER BY address";

    pool.query(selectQuery, [addressFilter], (err, rows) => {
      if (err) {
        console.error("Error retrieving data:", err);
        return res.status(500).send("Error retrieving data");
      }

      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Filtar Data</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div class="card">
            <div class="filter-form">
              <form method="GET" action="/">
                <input type="text" name="address" placeholder="Enter address to filter" value="${addressFilter}">
                <button type="submit">Filter</button>
                <button type="button" id="resetButton">Reset</button>
              </form>
            </div>

            <table id="customerTable">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
              </tr>
              ${rows
                .map(
                  (row) =>
                    `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.address}</td></tr>`
                )
                .join("")}
            </table>
          </div>
          <script src="script.js"></script>
        </body>
        </html>
      `);
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
