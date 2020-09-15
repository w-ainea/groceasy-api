const express = require("express");

const app = express();
const port = 8000;
const routes = require("./routes");

// mount routes
app.use(routes);

// moddlewares

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
