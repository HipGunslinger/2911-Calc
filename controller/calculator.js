let database = require("../database");

let CalcController = {
  basic: (req, res) => {
    res.render("calculator/index");
  },

  tax: (req, res) => {
    res.render("calculator/taxes");
  },

  advanced: (req, res) => {
    res.render("calculator/advanced");
  },

  currency: (req, res) => {
    res.render("calculator/currency");
  },

  about: (req, res) => {
    res.render("calculator/about");
  },
};



module.exports = CalcController;
