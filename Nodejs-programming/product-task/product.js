const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.get("/product", (req, res) => {
  const { name, price, discount } = req.query;

  if (!name || !price || !discount) {
    return res.send("Missing query parameters");
  }

  const finalPrice = price - (price * discount) / 100;

  fs.appendFileSync(
    "searches.txt",
    `Name: ${name}, Price: ${price}, Discount: ${discount}, Final: ${finalPrice}\n`
  );

  res.send(`
    <h1>Product Search Result</h1>
    <p>Name: ${name}</p>
    <p>Original Price: ${price}</p>
    <p>Discount: ${discount}%</p>
    <p>Final Price: ${finalPrice}</p>
  `);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});