const { Kafka } = require("kafkajs");

const createProducer = async () => {
  try {
    const kafka = new Kafka({
      clientId: "my-first-client",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();
    await producer.connect();

    // Send 5 msg to the first-topic
    for (let i = 0; i < 5; i++) {
      const res = await producer.send({
        topic: "first-topic",
        messages: [
          {
            value: `Msg for first-topic! MsgId: ${i}`,
          },
        ],
      });
      console.log("Message sent successfully", i);
    }

    // send 10 msg to the second-topic
    for (let i = 0; i < 10; i++) {
      const res = await producer.send({
        topic: "second-topic",
        messages: [
          {
            value: `Msg for second-topic! MsgId: ${i}`
          },
        ],
      });
      console.log("Message sent successfully", i);
    }

    await producer.disconnect();
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    process.exit(0);
  }
};

createProducer();
