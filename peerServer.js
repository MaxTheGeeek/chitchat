const {
    ExpressPeerServer
} = require("peer");

const server = require('./server');

const peerServer = ExpressPeerServer(server, {
    debug: true,
});

module.exports = peerServer;