const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Reply

  await sock.bind("tcp://127.0.0.1:3000")

  console.log('Requester bound to port 3000')

  for await (const [msg] of sock) {
    console.log(`Requester got an msg: ${msg} and now responding back with the twofold of msg...`)
    await sock.send(2 * parseInt(msg, 10))
  }
}

run()