const { makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const { state, saveState } = useSingleFileAuthState('./session.json');

const startBot = () => {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveState);
  return sock;
};

module.exports = startBot;