const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", require("./routes/app.routes"));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
