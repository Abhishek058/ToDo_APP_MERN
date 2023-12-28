const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://abhihek9728:bDVhZ7iyXtMMRk3u@cluster0.btztevc.mongodb.net/BEE_TODO"
    )
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = dbConnect;
