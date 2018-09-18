const express = require("express");
const Pusher = require("pusher");

const app = express();

const pusher = new Pusher({
  appId: "602723",
  key: "ed1e9ea5a087b9be2988",
  secret: "85ced5c8831920b60315",
  cluster: "eu",
  encrypted: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/prices/new", (req, res) => {
  pusher.trigger("coin-prices", "prices", {
    prices: req.body.prices
  });

  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Node app is running on port: " + PORT);
});
