// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date_string?", (req, res) => {
  let date_string = req.params.date_string;
  let date;

  if (!date_string) {
    date = new Date(); // Current date and time if no date_string is provided
  } else {
    // Check if date_string is numeric, then parse it as an integer (timestamp)
    if (!isNaN(date_string)) {
      date = new Date(parseInt(date_string));
    } else {
      // Otherwise, parse it as a string
      date = new Date(date_string);
    }
  }

  // Check if the date object is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
