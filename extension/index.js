const express = require("express");
const bodyparser = require("body-parser");

module.exports = (nodecg) => {
    let app = express();
    app.use(bodyparser.json());
    

    app.get("/rest/message", (req, res) => {
        nodecg.sendMessage(req.body["name"], req.body["data"]);
        res.status(200).json({
            "status": "OK"
        });
    });

    app.get("/rest/message/:bundleName", (req, res) => {
        nodecg.sendMessageToBundle(req.body["name"], req.params.bundleName, req.body["data"]);
        res.status(200).json({
            "status": "OK"
        });
    });

    app.get("/rest/replicant/:bundleName/:name", (req, res) => {
        let r = nodecg.Replicant(req.params.name, req.params.bundleName);
        res.status(200).json({
            "name": req.params.name,
            "bundle": req.params.bundleName,
            "value": r.value
        });
    });

    app.post("/rest/replicant/:bundleName/:name", (req, res) => {
        if(res.body.hasOwnProperty("data")) {
            let r = nodecg.Replicant(req.params.name, req.params.bundleName);
            r.value = res.body["data"];
            res.status(200).json({
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
