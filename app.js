"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)();
let response = {};
const port = process.env.PORT || 9999;
const name = process.env.MYNAME || "Kun";
fs_1.default.readFile("src/db.json", (error, data) => {
    if (error) {
        console.error(error);
        throw error;
    }
    response = JSON.parse(data.toString());
});
const app = (0, express_1.default)();
var jsonParser = body_parser_1.default.json();
app.get("/", (req, res) => {
    res.send("Hello " + name);
});
app.get("/users", (req, res) => {
    const { users } = response;
    if (users) {
        res.status(200).json(users);
    }
    else {
        res.status(404).json("Sorry, cant find that");
    }
});
app.get("/users/:id", (req, res) => {
    const { users } = response;
    const user = users === null || users === void 0 ? void 0 : users.find((user) => user.id === req.params.id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json("Sorry, cant find user");
    }
});
app.post("/users", jsonParser, (req, res) => {
    let user = {
        id: (0, uuid_1.v4)().slice(0, 8),
        name: req.body.name,
    };
    const { users } = response;
    users === null || users === void 0 ? void 0 : users.push(user);
    const newData = JSON.stringify(Object.assign(Object.assign({}, response), { users }));
    fs_1.default.writeFile("src/db.json", newData, "utf8", (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
            res.status(400).json({
                message: err.message,
            });
        }
        else {
            res.status(200).json(user);
            console.log(`File is written successfully!`);
        }
    });
});
app.delete("/users/:id", (req, res) => {
    let { users } = response;
    const deleteUser = users === null || users === void 0 ? void 0 : users.find((user) => user.id === req.params.id);
    if (deleteUser) {
        users = users === null || users === void 0 ? void 0 : users.filter((user) => user.id !== req.params.id);
        const newData = JSON.stringify(Object.assign(Object.assign({}, response), { users }));
        fs_1.default.writeFile("src/db.json", newData, "utf8", (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(500).json({
                    message: err.message,
                });
            }
            else {
                console.log(`File is written successfully!`);
                res.status(200).json(deleteUser);
            }
        });
    }
    else {
        res.status(400).json({
            message: "User not found",
        });
    }
});
app.put("/users/:id", jsonParser, (req, res) => {
    const { users } = response;
    let editUser = users === null || users === void 0 ? void 0 : users.find((user) => user.id === req.params.id);
    if (editUser) {
        const newUsers = users === null || users === void 0 ? void 0 : users.map((user) => {
            if (user.id === req.params.id) {
                editUser = Object.assign({ id: req.params.id }, req.body);
                return editUser;
            }
            else {
                return user;
            }
        });
        const newData = JSON.stringify(Object.assign(Object.assign({}, response), { newUsers }));
        fs_1.default.writeFile("src/db.json", newData, "utf8", (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
                res.status(500).json({
                    message: err.message,
                });
            }
            else {
                console.log(`File is written successfully!`);
                res.status(200).json(editUser);
            }
        });
    }
    else {
        res.status(400).json({
            message: "User not found",
        });
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
