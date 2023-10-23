const zmq = require("zeromq");

async function run() {
  const sock = new zmq.Request();

  sock.connect("tcp://127.0.0.1:3000");
  console.log("Replier bound to port 3000");

  setInterval(async () => {
    await sock.send("4");
    const [result] = await sock.receive();
    console.log(`Receiver got an msg: ${result}`);
  }, 1000);
}

run();
