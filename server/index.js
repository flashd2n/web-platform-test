const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const jpm = require('./jpm.json');

const webpush = require('web-push');

const API_URL_PREFIX = '/api';

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const subs = [];

const glueApps = {
    "message": "OK",
    "applications": [
        {
            "name": "FDC3 TradingView Chart (orig)",
            "appId": "fdc3-tradingview-chart-orig",
            "manifestType": "fdc3.glue42-core.demo",
            "manifest": "{\"url\":\"https://appd.kolbito.com/demos/tradingview-chart/index.html\"}",
            "intents": [
              {
                "name": "fdc3.ViewChart",
                "contexts": [
                  "fdc3.instrument"
                ]
              }
            ]
          },
          {
            "name": "FDC3 TradingView Blotter (orig)",
            "appId": "fdc3-tradingview-blotter-orig",
            "manifestType": "fdc3.glue42-core.demo",
            "manifest": "{\"url\":\"https://appd.kolbito.com/demos/tradingview-blotter/index.html\"}"
          }
    ]
};

const glueLayouts = {
    "layouts": [
        { "name": "example", "type": "Workspace", "components": [{ "type": "Workspace", "state": { "config": { "name": "second", "title": "Untitled 1" }, "context": {}, "children": [{ "type": "column", "config": {}, "children": [{ "type": "row", "config": {}, "children": [{ "type": "group", "config": {}, "children": [{ "type": "window", "config": { "appName": "SimpleOne" } }] }, { "type": "group", "config": {}, "children": [{ "type": "window", "config": { "appName": "SimpleOne" } }] }] }, { "type": "group", "config": {}, "children": [{ "type": "window", "config": { "appName": "SimpleOne" } }] }] }] } }], "metadata": {} }
    ]
};

const vapidKeys = {
    publicKey: 'BBSl8XfJ0039yNWr8VgOBjCgiGlM512hj6-8sTdISKguwoLZf3EKoLojoi8j5NSHtMVdMm0EAXZ_tj_F9qBIpcg',
    privateKey: 'N7Eq3Ebohzdn2Eqtv6J2rcHpkd2w9XT1cpwsKj42EJE'
};

webpush.setVapidDetails(
    'mailto:k.kostov.eu@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

app.get(`${API_URL_PREFIX}/glue-apps`, (req, res) => {
    res.json(glueApps);
});

app.get(`${API_URL_PREFIX}/jpm`, (req, res) => {
    res.json(jpm);
});

app.get(`${API_URL_PREFIX}/glue-layouts`, (req, res) => {
    res.json(glueLayouts);
});

// NOTIFICATIONS

wss.on('connection', (ws) => {
    console.log("GOT WS CONNECTION");
});

app.post(`${API_URL_PREFIX}/push-instruction`, async (req, res) => {

    for (const sub of subs) {
        try {
            await webpush.sendNotification(sub, JSON.stringify(req.body));
        } catch (error) {
            console.log('ERROR in push');
            console.log(error);
        }

        console.log(`Success push for ${sub.endpoint}`)
    }

    res.json(JSON.stringify({ data: { success: true } }));
});

app.post(`${API_URL_PREFIX}/websocket-instruction`, async (req, res) => {

    wss.clients.forEach((client) => client.send(JSON.stringify(req.body)));

    res.json(JSON.stringify({ data: { success: true } }));
});

app.post(`${API_URL_PREFIX}/push-sub`, (req, res) => {
    if (!subs.some((sub) => sub.keys.auth === req.body.keys.auth)) {
        subs.push(req.body);
    }
    res.json(JSON.stringify({ data: { success: true } }));
});

const port = process.env.PORT || 4224;

server.listen(port, function (error) {
    if (error) {
        throw error;
    }
    console.log(`Server listens at: ${port}`);
});
