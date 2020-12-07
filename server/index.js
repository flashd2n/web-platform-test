const express = require('express');
const bodyParser = require('body-parser');

const API_URL_PREFIX = '/api';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const glueApps = {
    "message": "OK",
    "applications": [
        {
            "name": "appA",
            "details": {
                "url": "http://localhost:9100/"
            },
            "customProperties": {
                "includeInWorkspaces": "true"
            }
        },
        {
            "name": "appB",
            "details": {
                "url": "http://localhost:9200/"
            },
            "customProperties": {
                "includeInWorkspaces": "true"
            }
        }
    ]
};

const glueLayouts = {
    "layouts": [
        { "name": "example", "type": "Workspace", "components": [{ "type": "Workspace", "state": { "config": { "name": "second", "title": "Untitled 1" }, "context": {}, "children": [{ "type": "column", "config": {}, "children": [{ "type": "row", "config": {}, "children": [{ "type": "group", "config": {}, "children": [{ "type": "window", "config": { "appName": "SimpleOne" } }] }, { "type": "group", "config": {}, "children": [{ "type": "window", "config": { "appName": "SimpleOne" } }] }] }, { "type": "group", "config": {}, "children": [{ "type": "window", "config": { "appName": "SimpleOne" } }] }] }] } }], "metadata": {} }
    ]
};

app.get(`${API_URL_PREFIX}/glue-apps`, (req, res) => {
    res.json(glueApps);
});

app.get(`${API_URL_PREFIX}/glue-layouts`, (req, res) => {
    res.json(glueLayouts);
});

const port = process.env.PORT || 4224;

app.listen(port, function (error) {
    if (error) {
        throw error;
    }
    console.log(`Server listens at: ${port}`);
});