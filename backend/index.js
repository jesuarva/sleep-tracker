console.log("\x1b[45mJSAV\x1b[0m HOLA  ");
require("dotenv").config();

const mongoose = require("mongoose");
const { server } = require("./server");

const { PORT, MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("\n*** CONNECTED to database ***\n");
    server.listen(PORT, () => {
      console.log(`\n*** Listening on port ${PORT} ***\n`);
    });
  })
  .catch((err) => {
    console.log("\n*** ERROR connecting to database ***\n", err);
  });
