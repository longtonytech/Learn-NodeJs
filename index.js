const express = require("express");
var bodyParser = require("body-parser");

const fs = require("fs");
let response = {};

fs.readFile("src/db.json", (error, data) => {
  if (error) {
    console.error(error);
    throw err;
  }
  response = JSON.parse(data);
});
const app = express();
var jsonParser = bodyParser.json();

app.get("/users", (req, res) => {
  const { users } = response;
  if (users) {
    res.send(users);
  } else {
    res.status(404).send("Sorry, cant find that");
  }
});

app.get("/users/:id", (req, res) => {
  const { users } = response;
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("Sorry, cant find user");
  }
});

app.post("/users", jsonParser, (req, res) => {
  const { users } = response;
  users.push(req.body);
  const newData = JSON.stringify({ ...response, users });
  fs.writeFile("src/db.json", newData, "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      res.send(req.body);
      console.log(`File is written successfully!`);
    }
  });
});

app.delete("/users/:id", (req, res) => {
  let { users } = response;
  users = users.filter((user) => user.id !== Number(req.params.id));
  const newData = JSON.stringify({ ...response, users });
  fs.writeFile("src/db.json", newData, "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully!`);
    }
  });
});

app.put("/users/:id", jsonParser, (req, res) => {
  let { users } = response;
  let resUser = {};
  users = users.map((user) => {
    if (user.id === Number(req.params.id)) {
      resUser = { ...user, name: req.body.name };
      return { ...user, name: req.body.name };
    } else {
      return user;
    }
  });
  if (Object.keys(resUser).length > 0) {
    const newData = JSON.stringify({ ...response, users });
    fs.writeFile("src/db.json", newData, "utf8", (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      } else {
        console.log(`File is written successfully!`);
      }
    });
    res.send(resUser);
  } else {
    res.status(404).send("Sorry, cant find user");
  }
});

const server = app.listen(8080, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
