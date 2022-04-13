const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const twit = require("twit");

const T = new twit({
  consumer_key: "kQ8I0nTu73kTSuMPRUYDdwnA0",
  consumer_secret: "0FvZYod87dLfKE5T74UiWJtUQY4xzCg4rVkXE6NqVxINlr6HbT",
  access_token: "1512346619349458952-k1gbR4jzV9KX77HjpE3Wn7lZXHxk79",
  access_token_secret: "B2oYTGPooBuk8hxfqLvhOICPMLxCsWWD9UMhXLx651buj",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Getting search
app.get("/tweets/:search", function (req, res) {
  T.get(
    "search/tweets",
    {
      q: `#${req.params.search}`,

      count: 100,
      tweet_mode: "extended",
    },
    function (err, data, response) {
      console.log(response);
      res.json(data);
    }
  );
});
// // Getting search 2
// app.get("/tweets/:search", function (req, res) {
//   T.get(
//     "statuses/user_timeline",
//     { screen_name: req.params.search, count: 5 },
//     function (err, data, response) {
//       res.json(data);
//     }
//   );
// });
// another
//
//  filter the twitter public stream by the word 'mango'.
//
// var stream = T.stream("statuses/filter", { track: "mango" });

// stream.on("tweet", function (tweet) {
//   console.log(tweet);
// });
// Posting Comments
app.post("/comment/", function (req, res) {
  console.log(req.body.comment);
  T.post(
    "statuses/update",
    { status: req.body.comment },
    function (err, data, response) {
      res.json(data);
    }
  );
});
app.listen(3000);
