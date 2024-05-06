const express = require("express");
const app = express();
const bodyParser= require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/", async (req, res) => {
  let API_KEY = "CWA-7CEA311C-CCD1-4F36-9A81-929C18FEDF5D";
  let url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}`;
  let data = await fetch(url);
  let data_j = await data.json();
  let locations = data_j.records.location;
  let locationNames = [];
  locations.forEach((element) => {
    locationNames.push(element);
  });
  console.log(locationNames);
  res.render("index.ejs", { locationNames });
});
app.listen(8000, () => {
  console.log("Server running on port 8000!!");
});
