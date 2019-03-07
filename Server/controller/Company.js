var companyModel = require("../model/Company");
var Company = {
  addCompany: function(req, res) {
    if (req.body._id) {
      companyModel.findByIdAndUpdate(
        req.body._id,
        req.body,
        { new: true },
        (err, item) => {
          if (err) return res.status(500).send(err);
          return res.send(item);
        }
      );
    } else {
      var company = new companyModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dateTime: req.body.dateTime
      });
      company.save(function(err, item) {
        if (err) {
          console.log("Saving the company error:" + err);
          res.statusCode = 400;
          res.json({ status: "error", data: err });
        } else {
          res.statusCode = 200;
          res.json({ status: "ok", data: item });
        }
      });
    }
  },

  getCompany: function(req, res) {
    res.send("getCompany");
  }
};
module.exports = Company;
