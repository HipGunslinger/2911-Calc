const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const CalcController = require("./controller/calculator");


app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes
app.get("/calculator", CalcController.basic);

app.get("/calculator/taxes", CalcController.tax);

app.get("/calculator/advanced", CalcController.advanced);

app.get("/calculator/currency", CalcController.currency);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/calculator in your browser 🚀"
  );
});
