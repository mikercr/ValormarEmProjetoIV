const express = require("express");
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

const app = express();

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here

app.use(morgan("dev")); // configire morgan

// define first route
app.get("/", (req, res) => {
	res.send("Welcome to backoffice ValorMar - IPVC!");
	console.log("Welcome to backoffice ValorMar - IPVC!");
});

const userRoutes = require("./api/route/user");
const operatorRoutes = require("./api/route/operator");
const operatorInfoRoutes = require("./api/route/operatorInfo");
const productRoutes = require("./api/route/product");
const lotRoutes = require("./api/route/lot");
const eventRoutes = require("./api/route/event");
const eventTypeRoutes = require("./api/route/eventType");
const eventInfoRoutes = require("./api/route/eventInfo");
const eventFieldRoutes = require("./api/route/eventField");
const eventInputLotRoutes = require("./api/route/eventInputLot");
const eventOutputLotRoutes = require("./api/route/eventOutputLot");
const eventTypeMandatoryFieldsRoutes = require("./api/route/eventTypeMandatoryFields");

app.use("/user", userRoutes);
app.use("/operator", operatorRoutes);
app.use("/operatorInfo", operatorInfoRoutes);
app.use("/product", productRoutes);
app.use("/lot", lotRoutes);
app.use("/event", eventRoutes);
app.use("/eventType", eventTypeRoutes);
app.use("/eventInfo", eventInfoRoutes);
app.use("/eventField", eventFieldRoutes);
app.use("/eventInputLot", eventInputLotRoutes);
app.use("/eventOutputLot", eventOutputLotRoutes);
app.use("/eventTypeMandatoryFields", eventTypeMandatoryFieldsRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
