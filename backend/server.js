const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Unhandled exception! 💥 shutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//Explicitly set the NODE_ENV for Express
app.set("env", process.env.NODE_ENV);

console.log("Enviroment:", process.env.NODE_ENV);

mongoose.connect(DB).then((con) => {
  console.log("DB connection succesful!");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("App running on port 3000....");
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! 💥 shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECIEVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
