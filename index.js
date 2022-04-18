const express = require("express");
const path = require("path");
const app = express();
const twit = require("twit");
require("dotenv").config();
console.log(process.env);
const T = new twit({
  consumer_key: process.env.Api_key,
  consumer_secret: process.env.Api_key_secret,
  access_token: process.env.Access_token,
  access_token_secret: process.env.Access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});
app.use(express.static(path.join(__dirname, "public")));

// Getting search
app.get("/tweets/:search", function (req, res) {
  T.get(
    "search/tweets",
    {
      q: `#${req.params.search}`,
      result_type: "mixed",
      count: 100,
      tweet_mode: "extended",
    },
    function (err, data, response) {
      console.log(response);
      res.json(data);
    }
  );
});

app.listen(3000);
