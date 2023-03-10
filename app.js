const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");


const app = express();

app.use(bodyParser.json());

 app.use((req, res, next)=>{

  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorizaation');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
  next()
}); 


app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://dltm:wcaUyzFQzgRX1Q3m@cluster0.5ewihvg.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to the database");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
