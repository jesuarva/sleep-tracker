console.log("\x1b[45mJSAV\x1b[0m HOLA  ");
require("dotenv").config();

const mongoose = require("mongoose");
const { server } = require("./server");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jesuarva-cynomi:--Super--Secret--1@cluster0.bithm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;

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
