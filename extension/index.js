'use strict';

const express = require("express");
const bodyparser = require("body-parser");
const auth = require("./auth");

module.exports = (nodecg) => {
    let app = express();
    app.use(bodyparser.json());
    app.use(auth(nodecg));

    app.post("/rest/message/:name", (req, res) => {
        if(req.body.hasOwnProperty("data")) {
            nodecg.sendMessage(req.params.name, req.body["data"]);
        } else {
            nodecg.sendMessage(req.params.name);
        }
        res.json({
            "status": "OK"
        });
    });

    app.post("/rest/message/:bundleName/:name", (req, res) => {
        if(req.body.hasOwnProperty("data")) {
            nodecg.sendMessageToBundle(req.params.name, req.params.bundleName, req.body["data"]);    
        } else {
            nodecg.sendMessageToBundle(req.params.name, req.params.bundleName);
        }
        res.json({
            "status": "OK"
        });
    });

    app.post("/rest/replicant/:name", (req, res) => {
        let r = nodecg.Replicant(req.params.name);
        res.json({
            "status": "OK",
            "name": req.params.name,
            "bundle": nodecg.bundleName,
            "value": r.value
        });
    });

    app.put("/rest/replicant/:name", (req, res) => {
        if(req.body.hasOwnProperty("data")) {
            let r = nodecg.Replicant(req.params.name);
            r.value = req.body["data"];
            res.json({
                "status": "OK",
                "name": req.params.name,
                "bundle": nodecg.bundleName,
                "value": r.value
            });
        } else {
            res.status(400).json({
                "status": "ERROR",
                "message": "No value given"
            });
        }
    });

    app.post("/rest/replicant/:bundleName/:name", (req, res) => {
        let r = nodecg.Replicant(req.params.name, req.params.bundleName);
        res.json({
            "status": "OK",
            "name": req.params.name,
            "bundle": req.params.bundleName,
            "value": r.value
        });
    });

    app.put("/rest/replicant/:bundleName/:name", (req, res) => {
        if(req.body.hasOwnProperty("data")) {
            let r = nodecg.Replicant(req.params.name, req.params.bundleName);
            r.value = req.body["data"];
            res.json({
                "status": "OK",
                "name": req.params.name,
                "bundle": req.params.bundleName,
                "value": r.value
            });
        } else {
            res.status(400).json({
                "status": "ERROR",
                "message": "No value given"
            });
        }
    });

    nodecg.mount(app);
};
