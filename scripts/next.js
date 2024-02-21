// config server file
require("dotenv").config();
const mongoose = require("mongoose");
const URI =
  process.env.MONGO_URI ||
  "mongodb+srv://nhatloi2202:KVIj8FFbNnmncd06@cluster0.1efkvah.mongodb.net/shoesdb";
const next = require("next");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const http = require("http");
const PORT = process.env.PORT || 3000;

// connect mongodb
mongoose.connect(URI, {
  // options
});
// mongo connected
mongoose.connection.on("connected", () => console.log("mongodb connected"));

// mongo connect error
mongoose.connection.on("error", (err) =>
  console.log("mongodb connect error", err)
);

// mongo disconnected
mongoose.connection.on("disconnected", () =>
  console.log("mongodb disconnected")
);

// handle disconnected

const handleDisconnect = () => {
  return mongoose.connection
    .close()
    .then(() => {
      console.log("mongodb disconnected");
    })
    .catch((err) => {
      console.log("mongodb connect error", err);
    });
};

// listener Ctrl + C
process.on("SIGINT", () => {
  handleDisconnect().then(() => process.exit(0));
});

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    return app.getRequestHandler()(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`ready on port localhost:${PORT}`);
  });
});
